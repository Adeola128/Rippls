
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SubmitTaskPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect users to the new integrated workbench submission flow
    navigate(`/active-task/${id}`);
  }, [id, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SubmitTaskPage;
