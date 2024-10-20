import React from 'react';

type NumberOfProps = {
  name: string;
  length: number;
  clickHandler?: () => void;
};

const NumberOf = ({ name, length, clickHandler }: NumberOfProps) => {
  const wrapperClasses = `
    text-[1.6rem] leading-[1.8rem]
    ${clickHandler ? 'cursor-pointer' : 'cursor-auto'}
    grid grid-rows-2 place-items-center
    text-[#999]
    md:block md:text-black
  `;

  return (
    <div className={wrapperClasses} onClick={clickHandler}>
      <span className="font-bold text-black">{length || 0}</span> {name}
    </div>
  );
};

export default NumberOf;
