import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { addCredentials, addScan, createUser, getUser } from "../utils";
import { useStore } from "../store/store";

const RedirectPage = () => {
  const navigate = useNavigate();

  const { setResponse, setId } = useStore();

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then(async (result: any) => {
        await createUser(result.visitorId);
        setId(result.visitorId);
        await fetchData(result.visitorId);
      });
  }, []);

  const fetchData = async (id: string) => {
    if (id) {
      try {
        const data = await getUser(id);
        if (data && data.name && data.surname) {
          await handleScan(id);
          return;
        } else {
          const status = await getCredentials(id);
          if (status) {
            await handleScan(id);
            return;
          } else {
            if (data && !data?.name && !data?.surname) {
              setResponse(
                "Щоб отримати бал, потрібно ввести дійсне ім’я та прізвище"
              );
            }
            navigate("/");
            return;
          }
        }
      } catch (error: any) {
        if (error.message) {
          setResponse(error.message);
        }
        navigate("/");
        return;
      }
    } else {
      navigate("/");
      return;
    }
  };

  const getCredentials = async (id: string) => {
    const userDetails = prompt("Enter your name and surname")
      ?.trim()
      .split(" ");
    if (userDetails?.length !== 2) {
      return false;
    }
    const credentials = { name: userDetails[0], surname: userDetails[1] };
    const userData = await addCredentials(id, credentials);
    return userData;
  };

  const handleScan = async (id: string): Promise<any> => {
    try {
      const data = await addScan(id);
      if (data?.message) {
        setResponse(data.message);
      }
      navigate("/profile");
      return data;
    } catch (err) {
      setResponse("Ви вже сканували сьогодні");
      navigate("/");
      return err;
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="min-h-screen flex justify-center items-center">
          <h1 className="text-[32px] md:text-[48px] xl:text-[56px] 2xl:text-[64px] text-white font-bold text-center leading-[110%]">
            Обробка ваших даних...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;
