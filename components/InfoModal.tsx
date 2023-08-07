'use client';
import { useCallback, useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlayBtn from './PlayBtn';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';

import React from 'react';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { movieId } = useInfoModal();

  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);
  if (!visible) return null;
  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 ">
      <div className="relative w-auto max-w-3xl mx-auto rounded-md overflow-hidden ">
        <div
          className={` ${
            isVisible ? 'scale-100' : 'scale-0'
          } transition duration-300 relative flex-auto bg-zinc-900 drop-shadow-md `}
        >
          <div className=" relative h-96">
            <video
              src={data?.videoUrl}
              poster={data?.thumbnailUrl}
              muted
              autoPlay
              className="w-full brightness-[60%] object-cover h-full "
            ></video>
            <button
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black  bg-opacity-80 flex items-center justify-center"
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" sizes={20} />
            </button>
            <div className="absolute bottom-[10%] left-20">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-80">
                {data?.title}
              </p>
              <div className=" flex  gap-4 items-center ">
                <PlayBtn movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8 text-white ">
            <p className="text-lg text-green-400 font-semibold ">New</p>
            <p className="text-whtie text-lg">{data?.duration}</p>
            <p className="text-whtie text-lg">{data?.genre}</p>
            <p className="text-whtie text-lg">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
