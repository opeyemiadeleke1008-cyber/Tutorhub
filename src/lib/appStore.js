const KEYS = {
  adminAccount: "tutorhubAdminAccount",
  adminSession: "tutorhubAdminSession",
  users: "tutorhubUsers",
  userSession: "tutorhubUserSession",
  tutors: "tutorhubTutors",
  tutorSession: "tutorhubTutorSession",
  conversations: "tutorhubConversations",
  bookings: "tutorhubBookings",
  reports: "tutorhubReports",
  likedTutors: "tutorhubLikedTutors",
  reviews: "tutorhubTutorReviews",
};

const ADMIN_EMAIL = "opeyemiadeleke1008@gmail.com";
const LEGACY_KEYS = {
  tutorProfile: "tutorhubTutorProfile",
  tutorPublicProfile: "tutorhubTutorPublicProfile",
  tutorProfiles: "tutorhubTutorProfiles",
  tutorAccounts: "tutorhubTutorAccounts",
  reports: "tutorhubReport",
  reportsAlt: "tutorhubUserReports",
  reportsAlt2: "tutorhubTutorReports",
};

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  return Object.values(value);
};

const getAllStorageValues = (matcher) => {
  const rows = [];
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (!matcher(key)) continue;
      const parsed = read(key, null);
      rows.push(...toArray(parsed));
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) rows.push(parsed);
    }
  } catch {
    return [];
  }
  return rows;
};

const normalizeTutor = (record = {}) => {
  if (!record || typeof record !== "object") return null;
  const email = String(record.email || "").trim();
  if (!email) return null;
  const fullName = String(record.fullName || record.name || email.split("@")[0] || "Tutor");
  const publicProfile = record.publicProfile || null;
  const approvalCandidate = String(record.approvalStatus || record.status || "").toLowerCase();
  const approvalStatus =
    approvalCandidate === "approved" ||
    approvalCandidate === "active" ||
    approvalCandidate === "pending" ||
    approvalCandidate === "none"
      ? approvalCandidate
      : publicProfile
      ? "pending"
      : "none";
  const accountCandidate = String(record.accountStatus || "").toLowerCase();
  const accountStatus =
    accountCandidate === "restricted" || accountCandidate === "disabled" || accountCandidate === "active"
      ? accountCandidate
      : "active";

  return {
    id: record.id || uid("ttr"),
    fullName,
    email,
    password: record.password || "",
    createdViaSignup:
      typeof record.createdViaSignup === "boolean"
        ? record.createdViaSignup
        : Boolean(record.password),
    role: "Tutor",
    accountStatus,
    approvalStatus,
    verified: Boolean(record.verified),
    rating: Number(record.rating || 0),
    publicProfile,
    createdAt: record.createdAt || new Date().toISOString(),
  };
};

const normalizeReport = (record = {}) => {
  if (!record || typeof record !== "object") return null;
  const message = String(record.message || record.text || "").trim();
  if (!message) return null;
  const statusRaw = String(record.status || "").toLowerCase();
  const status = statusRaw === "closed" ? "closed" : "open";
  const typeRaw = String(record.type || "").toLowerCase();
  const type = typeRaw === "tutor" ? "tutor" : "website";

  return {
    id: record.id || uid("rpt"),
    fromRole: record.fromRole || record.role || "User",
    fromName: record.fromName || record.name || "Anonymous",
    type,
    targetTutorId: record.targetTutorId || null,
    message,
    status,
    createdAt: record.createdAt || new Date().toISOString(),
  };
};

const migrateLegacyTutorIfNeeded = () => {
  const tutors = toArray(read(KEYS.tutors, [])).map(normalizeTutor).filter(Boolean);
  const legacyTutor = read(LEGACY_KEYS.tutorProfile, null);
  const legacyPublicProfile = read(LEGACY_KEYS.tutorPublicProfile, null);
  const legacyProfiles = toArray(read(LEGACY_KEYS.tutorProfiles, []));
  const legacyAccounts = toArray(read(LEGACY_KEYS.tutorAccounts, []));
  const scannedTutorLike = getAllStorageValues((key) => key.toLowerCase().includes("tutor"));

  const bucket = new Map();
  tutors.forEach((t) => {
    bucket.set(t.email.toLowerCase(), t);
  });

  [...legacyProfiles, ...legacyAccounts, ...scannedTutorLike].forEach((item) => {
    const normalized = normalizeTutor(item);
    if (!normalized) return;
    const key = normalized.email.toLowerCase();
    if (!bucket.has(key)) bucket.set(key, normalized);
  });

  if (legacyTutor?.email) {
    const mergedLegacy = normalizeTutor({
      ...legacyTutor,
      publicProfile: legacyPublicProfile || legacyTutor.publicProfile || null,
      approvalStatus: legacyTutor.approvalStatus || (legacyPublicProfile ? "pending" : "none"),
    });
    if (mergedLegacy && !bucket.has(mergedLegacy.email.toLowerCase())) {
      bucket.set(mergedLegacy.email.toLowerCase(), mergedLegacy);
    }
  }

  const next = Array.from(bucket.values());
  write(KEYS.tutors, next);
  return next;
};

const ensureUserSeed = () => {
  const users = read(KEYS.users, []);
  if (users.length === 0) {
    const legacy = read("tutorhubUserProfile", null);
    const user = {
      id: uid("usr"),
      email: legacy?.email || "user@tutorhub.com",
      fullName: legacy?.fullName || "Default User",
      role: "User",
    };
    write(KEYS.users, [user]);
    write(KEYS.userSession, { userId: user.id });
  }
};

export const getCurrentUser = () => {
  ensureUserSeed();
  const session = read(KEYS.userSession, null);
  const users = read(KEYS.users, []);
  const found = users.find((u) => u.id === session?.userId);
  return found || users[0];
};

export const upsertCurrentUser = (payload) => {
  ensureUserSeed();
  const users = read(KEYS.users, []);
  const current = getCurrentUser();
  const merged = { ...current, ...payload };
  const next = users.map((u) => (u.id === current.id ? merged : u));
  write(KEYS.users, next);
  write(KEYS.userSession, { userId: merged.id });
  return merged;
};

export const getAdminAccount = () => read(KEYS.adminAccount, null);
export const createAdminAccount = (password) => {
  const account = { email: ADMIN_EMAIL, password };
  write(KEYS.adminAccount, account);
  return account;
};

export const adminSignIn = (email, password) => {
  const account = getAdminAccount();
  if (!account) return { ok: false, reason: "setup_required" };
  if (email !== ADMIN_EMAIL) return { ok: false, reason: "invalid_email" };
  if (account.password !== password) return { ok: false, reason: "invalid_password" };
  write(KEYS.adminSession, { email, role: "Admin" });
  return { ok: true };
};

export const isAdminSignedIn = () => Boolean(read(KEYS.adminSession, null)?.email);
export const adminSignOut = () => localStorage.removeItem(KEYS.adminSession);

const getRealTutors = () => {
  const tutors = migrateLegacyTutorIfNeeded();
  return tutors.filter((t) => t.role === "Tutor" && Boolean(t.email));
};

export const getTutors = () => getRealTutors();

export const tutorSignUp = ({ fullName, email, password }) => {
  const tutors = getTutors();
  if (tutors.some((t) => t.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, reason: "exists" };
  }
  const tutor = {
    id: uid("ttr"),
    fullName,
    email,
    password,
    createdViaSignup: true,
    role: "Tutor",
    accountStatus: "active", // active | restricted | disabled
    approvalStatus: "none", // none | pending | active
    verified: false,
    rating: 0,
    publicProfile: null,
    createdAt: new Date().toISOString(),
  };
  write(KEYS.tutors, [tutor, ...tutors]);
  write(KEYS.tutorSession, { tutorId: tutor.id });
  return { ok: true, tutor };
};

export const tutorSignIn = ({ email, password }) => {
  const tutors = getTutors();
  const tutor = tutors.find((t) => t.email.toLowerCase() === email.toLowerCase());
  if (!tutor) return { ok: false, reason: "not_found" };
  if (tutor.password !== password) return { ok: false, reason: "invalid_password" };
  if (tutor.accountStatus === "disabled") return { ok: false, reason: "disabled" };
  write(KEYS.tutorSession, { tutorId: tutor.id });
  return { ok: true, tutor };
};

export const tutorSignOut = () => localStorage.removeItem(KEYS.tutorSession);
export const getTutorSession = () => read(KEYS.tutorSession, null);
export const getCurrentTutor = () => {
  const session = getTutorSession();
  if (!session) return null;
  return getTutors().find((t) => t.id === session.tutorId) || null;
};

export const updateTutor = (tutorId, patch) => {
  const tutors = getTutors();
  const next = tutors.map((t) => (t.id === tutorId ? { ...t, ...patch } : t));
  write(KEYS.tutors, next);
  return next.find((t) => t.id === tutorId) || null;
};

export const submitTutorPublicProfile = (tutorId, publicProfile) =>
  updateTutor(tutorId, { publicProfile, approvalStatus: "pending" });

export const approveTutor = (tutorId) =>
  updateTutor(tutorId, { approvalStatus: "active", accountStatus: "active" });
export const setTutorVerification = (tutorId, verified) => updateTutor(tutorId, { verified });
export const setTutorRating = (tutorId, rating) => updateTutor(tutorId, { rating: Number(rating) || 0 });
export const setTutorAccountStatus = (tutorId, accountStatus) => updateTutor(tutorId, { accountStatus });

export const getPublicTutors = () =>
  getTutors().filter(
    (t) =>
      (t.approvalStatus === "active" || t.approvalStatus === "approved") &&
      t.accountStatus === "active" &&
      t.publicProfile
  );

const getConversationsRaw = () => read(KEYS.conversations, []);
const saveConversations = (items) => write(KEYS.conversations, items);
const getBookingsRaw = () => read(KEYS.bookings, []);
const saveBookings = (items) => write(KEYS.bookings, items);

export const getConversationsForUser = (userId) =>
  getConversationsRaw().filter((c) => c.userId === userId);

export const getConversationsForTutor = (tutorId) =>
  getConversationsRaw().filter((c) => c.tutorId === tutorId);

export const ensureConversation = ({ userId, tutorId }) => {
  const conversations = getConversationsRaw();
  const existing = conversations.find((c) => c.userId === userId && c.tutorId === tutorId);
  if (existing) return existing;
  const convo = {
    id: uid("cnv"),
    userId,
    tutorId,
    messages: [],
    bookingId: null,
    updatedAt: new Date().toISOString(),
  };
  saveConversations([convo, ...conversations]);
  return convo;
};

export const sendMessage = ({
  conversationId,
  senderRole,
  text,
  type = "text",
  fileName = "",
  fileUrl = "",
  mimeType = "",
  fileSize = 0,
}) => {
  const conversations = getConversationsRaw();
  const next = conversations.map((c) => {
    if (c.id !== conversationId) return c;
    const message = {
      id: uid("msg"),
      senderRole,
      text,
      type,
      fileName,
      fileUrl,
      mimeType,
      fileSize,
      sentAt: new Date().toISOString(),
    };
    return { ...c, messages: [...c.messages, message], updatedAt: new Date().toISOString() };
  });
  saveConversations(next);
};

export const createBooking = ({ conversationId, userId, tutorId, subject, date, time, note }) => {
  const bookings = getBookingsRaw();
  const booking = {
    id: uid("bok"),
    conversationId,
    userId,
    tutorId,
    subject,
    date,
    time,
    note,
    status: "pending",
    createdAt: new Date().toISOString(),
    reviewed: false,
  };
  saveBookings([booking, ...bookings]);

  const conversations = getConversationsRaw().map((c) =>
    c.id === conversationId ? { ...c, bookingId: booking.id, updatedAt: new Date().toISOString() } : c
  );
  saveConversations(conversations);
  return booking;
};

export const updateBookingStatus = (bookingId, status) => {
  const bookings = getBookingsRaw();
  const next = bookings.map((b) => (b.id === bookingId ? { ...b, status } : b));
  saveBookings(next);
};

export const getBookingById = (bookingId) => getBookingsRaw().find((b) => b.id === bookingId) || null;
export const getBookingsForUser = (userId) => getBookingsRaw().filter((b) => b.userId === userId);
export const getBookingsForTutor = (tutorId) => getBookingsRaw().filter((b) => b.tutorId === tutorId);

export const submitReview = ({ bookingId, tutorId, stars, comment }) => {
  const reviews = read(KEYS.reviews, []);
  const review = { id: uid("rvw"), bookingId, tutorId, stars, comment, createdAt: new Date().toISOString() };
  write(KEYS.reviews, [review, ...reviews]);

  const tutorReviews = [review, ...reviews].filter((r) => r.tutorId === tutorId);
  const avg = tutorReviews.reduce((sum, r) => sum + Number(r.stars || 0), 0) / tutorReviews.length;
  setTutorRating(tutorId, Number(avg.toFixed(1)));

  const bookings = getBookingsRaw().map((b) => (b.id === bookingId ? { ...b, reviewed: true } : b));
  saveBookings(bookings);
};

export const getLikedTutorIds = () => read(KEYS.likedTutors, []);
export const toggleLikeTutor = (tutorId) => {
  const liked = getLikedTutorIds();
  const next = liked.includes(tutorId) ? liked.filter((id) => id !== tutorId) : [tutorId, ...liked];
  write(KEYS.likedTutors, next);
  return next;
};

export const getLikedTutors = () => {
  const ids = getLikedTutorIds();
  const tutors = getPublicTutors();
  return tutors.filter((t) => ids.includes(t.id));
};

export const submitReport = ({ fromRole, fromName, type, targetTutorId, message }) => {
  const reports = getReports();
  const report = {
    id: uid("rpt"),
    fromRole,
    fromName,
    type,
    targetTutorId: targetTutorId || null,
    message,
    status: "open",
    createdAt: new Date().toISOString(),
  };
  write(KEYS.reports, [report, ...reports]);
};

const migrateLegacyReportsIfNeeded = () => {
  const current = toArray(read(KEYS.reports, [])).map(normalizeReport).filter(Boolean);
  const legacy = [
    ...toArray(read(LEGACY_KEYS.reports, [])),
    ...toArray(read(LEGACY_KEYS.reportsAlt, [])),
    ...toArray(read(LEGACY_KEYS.reportsAlt2, [])),
    ...getAllStorageValues((key) => key.toLowerCase().includes("report")),
  ]
    .map(normalizeReport)
    .filter(Boolean);

  const bucket = new Map();
  [...current, ...legacy].forEach((item) => {
    const reportKey = `${item.message}|${item.fromName}|${item.createdAt}`;
    if (!bucket.has(reportKey)) bucket.set(reportKey, item);
  });
  const next = Array.from(bucket.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  write(KEYS.reports, next);
  return next;
};

export const getReports = () => migrateLegacyReportsIfNeeded();
export const closeReport = (reportId) => {
  const reports = getReports().map((r) => (r.id === reportId ? { ...r, status: "closed" } : r));
  write(KEYS.reports, reports);
};

export { ADMIN_EMAIL };
