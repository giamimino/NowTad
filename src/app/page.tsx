"use client"
import React, { useState } from "react";
import SideBarNav from "./components/SideBarNav";
import NotesList from "./components/NotesList";
import Editor from "./components/Editor";
import { NotesContext } from "./context/NotesContext";
import { NoteContext } from "./global";

export default function Home() {
  const [content, setContent] = useState<NoteContext[]>([
    {
    noteId: "dwdawdwa",
    folderId: "dwdawdwa",
    content: {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "It's "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "italic"
                        }
                    ],
                    "text": "hard"
                },
                {
                    "type": "text",
                    "text": " to believe that June is already over! "
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "hardBreak"
                },
                {
                    "type": "text",
                    "text": "Looking back on the month, there were a few highlights that stand out to me. One of the best things that happened was getting promoted at work. I've been working really hard and it's great to see that effort recognized. It's also exciting to have more responsibility and the opportunity to contribute to the company in a bigger way. I'm looking forward to taking on new challenges and learning as much as I can in my new role. I also had a great time on my vacation to Hawaii. The beaches were beautiful and I loved trying all of the different types of Hawaiian food. It was nice to relax and get away from the daily grind for a bit. I'm so grateful to have had the opportunity to take a trip like that. On the downside, I feel like I didn't make as much progress on my fitness goals as I would have liked. I was really busy with work and didn't make it to the gym as often as I planned. I'm going to try to be more consistent in July and make exercise a higher priority. I know it will be good for my physical and mental health. I also had a few rough patches in my relationships this month. I had a couple of misunderstandings with friends and it was hard to navigate those conflicts. But I'm glad we were able to talk things through and move past them. I value my relationships and I want to make sure I'm always working to be a good friend. Overall, it was a good month with a mix of ups and downs. I'm looking forward to what July has in store! I'm hoping to make some more progress on my goals and spend quality time with the people I care about."
                }
            ]
        }
    ]
}}])
  return (
    <div className="flex overflow-hidden h-full w-full">
      <SideBarNav />
      <NotesList content={"what"} folder={"Personal"} />
      <NotesContext.Provider
        value={{content, setContent}}
      >
        <Editor
          title="Reflection on the Month of June"
          createdAt={new Date()}
          folder="Personal"
        />
      </NotesContext.Provider>
    </div>
  );
}
