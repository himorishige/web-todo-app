/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import Loader from 'react-loader-spinner';

const Skelton: React.VFC = memo(() => {
  return (
    <div>
      <Loader type="TailSpin" color="#5e454b" height={100} width={100} timeout={3000} />
    </div>
  );
});

export default Skelton;
