import { Routes, Route } from 'react-router-dom';
import { DetailPage, Home, Page404 } from 'src/components/pages';

const Router: React.VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="tasks">
        <Route path=":id" element={<DetailPage />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
