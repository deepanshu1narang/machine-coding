const Head = (
  <div
    style={{
      border: "0.5rem solid black",
      borderRadius: "100%",
      height: "3rem",
      width: "3rem",
      position: "absolute",
      top: "3.7rem",
      right: "-1.7rem",
    }}
  />
);

const Torso = (
  <div
    style={{
      height: "5rem",
      width: "0.5rem",
      position: "absolute",
      top: "7.3rem",
      backgroundColor: "black",
      right: 0,
    }}
  />
);

interface ArmProps {
  rotate: string;
  transformOrigin: string;
  right: string;
}

interface LegProps extends ArmProps {
  a?: any;
}

const Arm = ({ rotate, transformOrigin, right }: ArmProps): JSX.Element => (
  <div
    style={{
      height: "0.5rem",
      width: "3.5rem",
      backgroundColor: "black",
      transformOrigin: transformOrigin,
      position: "absolute",
      right: right,
      rotate: rotate,
      top: "9.3rem",
    }}
  />
);

const Leg = ({ rotate, transformOrigin, right }: LegProps): JSX.Element => (
  <div
    style={{
      height: "0.5rem",
      width: "3.5rem",
      backgroundColor: "black",
      transformOrigin: transformOrigin,
      position: "absolute",
      //   right: "-3.3rem",
      right: right,
      rotate: rotate,
      top: "12rem",
    }}
  />
);

const RightArm = <Arm rotate="-30deg" transformOrigin="left bottom" right="-3.3rem" />;
const LeftArm = <Arm rotate="30deg" transformOrigin="right bottom" right="0.3rem" />;
const RightLeg = <Leg rotate="60deg" transformOrigin="left top" right="-3.4rem" />;
const LeftLeg = <Leg rotate="-60deg" transformOrigin="right top" right="0.4rem" />;

const BODY_PARTS = [Head, Torso, RightArm, LeftArm, RightLeg, LeftLeg];

interface Props {
  numberOfGuesses: number;
}

const HangmanDrawing = ({ numberOfGuesses }: Props) => {
  return (
    <div style={{ position: "relative" }}>
      {/* the line where hangman will be hanged */}
      <div style={{ height: "4rem", width: "0.5rem", backgroundColor: "black", position: "absolute", top: 0, right: 0 }} />

      {BODY_PARTS.slice(0, numberOfGuesses)}
      {/* {Head}
      {Torso}
      {RightArm}
      {LeftArm}
      {RightLeg}
      {LeftLeg} */}

      {/* biggest horizontal line */}
      <div style={{ height: "0.5rem", width: "10rem", backgroundColor: "black" }} />
      {/* longest vertical line */}
      <div style={{ height: "20rem", width: "0.5rem", backgroundColor: "black" }} />
      {/* base line */}
      <div style={{ height: "0.5rem", width: "4rem", backgroundColor: "black", marginLeft: "-1.8rem" }} />
    </div>
  );
};

export default HangmanDrawing;
