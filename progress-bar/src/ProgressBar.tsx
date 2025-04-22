import { CSSProperties, FC, SetStateAction, useEffect, useState } from "react";

interface ProgressBarProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

const ProgressBar: FC<ProgressBarProps> = ({ isLoading, setIsLoading }: ProgressBarProps) => {
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    let interval: number = 0;
    if (isLoading) {
      interval = setInterval(() => {
        setCompleted((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const style: CSSProperties = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div className="progress-bar">
      <div style={style}></div>
    </div>
  );
};

export default ProgressBar;
