import React, { FC, ReactElement } from 'react';

interface Props {

    title: string;
}

const Subtitle: FC<Props> = ({ title }: Props): ReactElement => {

    return <h2 className="subtitle">{ title }</h2>;
}

export default Subtitle;
