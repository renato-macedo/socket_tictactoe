import React, { PropsWithChildren } from 'react'

export default function Square(
  props: PropsWithChildren<{ value: string; onClick: () => void }>,
) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}