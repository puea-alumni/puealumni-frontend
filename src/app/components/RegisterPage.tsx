import { useEffect } from "react";
import { useNavigate } from "react-router";

export function RegisterPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);
  return null;
}
