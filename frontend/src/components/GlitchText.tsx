interface GlitchTextProps {
  text: string;
}

const GlitchText = ({ text }: GlitchTextProps) => {
  return <span>{text}</span>;
};

export default GlitchText;
