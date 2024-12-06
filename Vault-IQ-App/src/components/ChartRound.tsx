import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";

export const ChartRound = () => {
  const totalRef = useRef(null);
  const sessionRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const cardData = {
    sessions: [
      {
        label: "Phone",
        size: 60,
        color: "bg-indigo-600",
      },
      {
        label: "Tablet",
        size: 30,
        color: "bg-indigo-400",
      },
      {
        label: "Desktop",
        size: 10,
        color: "bg-indigo-200",
      },
    ],
  };

  useEffect(() => {
    if (totalRef.current) {
      const totalCountUp = new CountUp(totalRef.current, 11602, {
        duration: 0.8,
      });
      totalCountUp.start();
    }

    cardData.sessions.forEach((session, index) => {
      if (sessionRefs.current[index]) {
        const sessionCountUp = new CountUp(
          sessionRefs.current[index]!,
          session.size,
          {
            duration: 1.6,
          }
        );
        sessionCountUp.start();
      }
    });
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div className="bg-white text-gray-800 rounded shadow-xl py-3 px-5 w-full sm:w-2/3 md:w-1/2 lg:w-full">
        <div className="flex w-full mb-2">
          <h3 className="text-md font-semibold leading-tight flex-1 text-gray-800">
            TOTAL SESSIONS
          </h3>
        </div>

        {/* Total Count */}
        <div className="pb-2">
          <h4
            className="text-xl lg:text-2xl text-gray-800 font-semibold leading-tight inline-block"
            ref={totalRef}
          >
            0
          </h4>
        </div>

        {/* Progress Bar */}
        <div className="pb-1">
          <div className="overflow-hidden rounded-full h-2 bg-gray-200 flex">
            {cardData.sessions.map((session, index) => (
              <div
                key={index}
                className={`h-full ${session.color}`}
                style={{ width: `${session.size}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Session Details */}
        <div className="flex">
          {cardData.sessions.map((session, index) => (
            <div
              key={index}
              className={`w-1/3 px-4 ${
                index !== 0 ? "border-l border-gray-300" : ""
              }`}
            >
              <div className="text-sm">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-1 align-middle ${session.color}`}
                ></span>
                <span className="align-middle">{session.label}</span>
              </div>
              <div className="font-medium text-lg text-gray-800">
                <span ref={(el) => (sessionRefs.current[index] = el)}>0</span>%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
