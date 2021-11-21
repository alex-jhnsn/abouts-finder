import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Upload } from './components/Upload';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="OptionsContainer">{title} Page</div>
      <Upload />
    </div>
  );
};

export default Options;
