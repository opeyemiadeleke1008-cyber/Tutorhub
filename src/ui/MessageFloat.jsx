import React from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function MessageFloat() {
  return (
    <div className="sm:hidden block">
      <Link to="/usermessages">
        <button className="fixed bottom-30 right-4 bg-black text-white p-3 rounded-full shadow-lg">
          <MessageCircle size={24} />
        </button>
      </Link>
    </div>
  );
}
