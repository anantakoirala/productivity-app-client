"use client";
import { Send } from "lucide-react";
import React, { ChangeEvent, SetStateAction, useRef, useState } from "react";

type Props = {
  tags: string[];
  setTags: React.Dispatch<SetStateAction<string[]>>;
};

const TagInput = ({ tags, setTags }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
  const [sendInvite, setSendInvite] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      const emailValid = validateEmail(value);
      setSendInvite(!tags.includes(value) && emailValid);
    } else {
      setFilteredUsers([]);
      setSendInvite(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const setAutoFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const sendInvitation = () => {
    setSendInvite(false);
    if (!tags.includes(inputValue)) {
      setTags((prevTags) => [...prevTags, inputValue]);
    }
    setInputValue("");
    setFilteredUsers([]);
  };

  return (
    <div className="relative">
      <div
        className="flex flex-row flex-wrap  w-full sm:w-[100%] h-28 overflow-auto border bg-background gap-1 p-2 rounded-md"
        onClick={setAutoFocus}
      >
        {tags &&
          tags.map((tag, index) => (
            <span
              className="flex items-center justify-center h-10 border rounded-md bg-primary text-center px-2 py-1  text-black"
              key={index}
            >
              {tag}
            </span>
          ))}

        <input
          ref={inputRef}
          type="text"
          autoFocus
          className=" w-auto h-10  px-3 py-2  rounded-md outline-none  bg-background text-muted-foreground placeholder:text-sm"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={"invite users"}
        />
      </div>
      {filteredUsers.length > 0 && (
        <div className="flex flex-col border  overflow-y-auto w-full sm:w-[50%] absolute top-30 bg-card">
          {filteredUsers.map((user) => (
            <div
              key={user}
              className="cursor-pointer p-2 hover:bg-background text-primary"
              //   onClick={() => handleUserClick(user)}
            >
              {user}
            </div>
          ))}
        </div>
      )}
      {sendInvite && (
        <div
          className="flex flex-row items-center justify-center gap-2 border w-full sm:w-[50%] overflow-y-auto  absolute top-30 bg-card p-2"
          onClick={sendInvitation}
        >
          <div className="flex flex-row items-center justify-center cursor-pointer text-primary">
            <Send />
            sendinvite
          </div>
        </div>
      )}
    </div>
  );
};

export default TagInput;
