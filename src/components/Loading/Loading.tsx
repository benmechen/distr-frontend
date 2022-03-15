import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import { indigo } from 'tailwindcss/colors';

const Loading = () => <TailSpin color={indigo[500]} height={50} />;
export default Loading;
