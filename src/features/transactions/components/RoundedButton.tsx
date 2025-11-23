type RoundedButtonProps = {
  text: string;
  onClick: (text: string) => void;
};

const RoundedButton = ({ text, onClick }: RoundedButtonProps) => {
  return (
    <button
      className="
        rounded-full 
        border border-gray-300 
        px-5 py-2 
        font-medium
        text-gray-700 
        bg-white 
        transition-all 
        duration-200 
        ease-in-out
        hover:bg-orange-300 
        hover:text-white 
        hover:border-orange-600 
        active:scale-95 
        active:bg-orange-700
        focus:outline-none 
        focus:ring-2 
        focus:ring-orange-300
      "
      onClick={() => onClick(text)} 
    >
      {text}
    </button>
  );
};

export default RoundedButton;
