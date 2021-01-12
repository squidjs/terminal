import React, { FC, ReactElement } from 'react';

interface Props {

    text: string;
}

const Text: FC<Props> = ({ text }: Props): ReactElement => {

    return <p className="text">{ text }</p>;
}

export default Text;
