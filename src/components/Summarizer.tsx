// summarizer.tsx
//https://ohio.stream-io-cdn.com/1337647/video/recordings/default_078bb31f-8b9c-47c1-93d6-de2da5dbb4d5/rec_default_078bb31f-8b9c-47c1-93d6-de2da5dbb4d5_720p_1729401370162.mp4?Expires=1729558244&Signature=i71BGWKsZqOo8lx31697PxMHS1GL5~m5UKZQussomWyYxImIoD~oufvQQtZZPCcvI2iVQUQ4EG0Jpv5-YpWGXgjMHfARrigkDcueunQsPZPMGyxhGt7Ew7IYpOYnlYoCtC47oyfln12zxPPjU0wgpcFEqD5xnNYELXtKfo-6Xgrx0jDDYqZF7QQMlt5fEk8K73G5rKNy-VkPzTXh-jUHtDYjTbXzprVv~-oCDg6vkV8mvjgBC5TzC0miSLxNYobOy8p2YLrysmdAq6p617nK~DR2tnSxTUUFeQyE67Ztt23oCPDm9YVDbPlqtvVB41S1pBPME5TJoAKvpFkISx3wGw__&Key-Pair-Id=APKAIHG36VEWPDULE23Q
// Distill Wisdom: """Analyze the transcript and extract key insights and wisdom including a concise title that reflects the content.

// **{TITLE}**

// **IDEAS**
// - ...

// **QUOTES**
// - ...

// **REFERENCES**
// - ...

// - **Formatting Guidelines**:
//   - **Title**: Start with the title in bold (**{TITLE}**).
//   - **Categories**: Use bold for category headers (**IDEAS**, **QUOTES**, **REFERENCES**).
//   - **Bullet Points**: Use hyphens (-) for each bullet point.
//   - **Omit Empty Categories**: Do not include a category if there are no relevant items.
//   - **No Additional Text**: Do not add any introductory phrases, explanations, or headers using #.
//   - **Grammar**: Correct the sentence grammatically and fix any spelling mistakes as well.
//   - **Strict Template Adherence**: Follow the template exactly as shown above without deviations.

// Here is the text: ${transcribedData}`,
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { Bot, Loader2, User2 } from "lucide-react";
import Markdown from "./Markdown";
import { TranscriberData } from "../hooks/useTranscriber";

type SummarizerProps = {
  transcribedData: TranscriberData | undefined;
};

export default function Summarizer({ transcribedData }: SummarizerProps) {
  const { messages, handleSubmit, isLoading } = useChat({
    api: "/api/llm-response", // Ensure this matches your API endpoint
  });

  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (transcribedData) {
      setTranscript(JSON.stringify(transcribedData));
    }
  }, [transcribedData]);

  useEffect(() => {
    if (transcript) {
      const submitSummarization = async () => {
        try {
          await handleSubmit(undefined, {
            data: {
              prompt: `Distill Wisdom: """Analyze the transcript and extract key insights and wisdom including a concise title that reflects the content.

**{TITLE}**

**IDEAS**
- ...

**QUOTES**
- ...

**REFERENCES**
- ...

- **Formatting Guidelines**:
  - **Title**: Start with the title in bold (**{TITLE}**).
  - **Categories**: Use bold for category headers (**IDEAS**, **QUOTES**, **REFERENCES**).
  - **Bullet Points**: Use hyphens (-) for each bullet point.
  - **Omit Empty Categories**: Do not include a category if there are no relevant items.
  - **No Additional Text**: Do not add any introductory phrases, explanations, or headers using #.
  - **Grammar**: Correct the sentence grammatically and fix any spelling mistakes as well.
  - **Strict Template Adherence**: Follow the template exactly as shown above without deviations.

Here is the text: ${transcript}`,
            },
          });
        } catch (error) {
          console.error("Error during API call:", error);
        }
      };

      submitSummarization();
    }
  }, [transcript, handleSubmit]);

  return (
    <main className="flex min-h-screen flex-col items-center p-12 text-black">
      {RenderMessages()}
    </main>
  );

  function RenderMessages() {
    return (
      <div id="chatbox" className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`p-4 shadow-md rounded-md ml-10 relative ${m.role === "user" ? "bg-stone-300" : ""}`}
          >
            <Markdown text={m.content} />
            {m.role === "user" ? (
              <User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg" />
            ) : (
              <Bot className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0]" />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </div>
    );
  }
}
