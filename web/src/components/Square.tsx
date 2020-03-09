import React, { PropsWithChildren } from 'react';
export default function Square(
  props: PropsWithChildren<{ value: string; color?: string; onClick: () => void }>,
) {
  return (
    <button className="square" style={{ backgroundColor: props.color, borderColor: props.color }} onClick={props.onClick}>
      {props.value}
    </button>
  );
}