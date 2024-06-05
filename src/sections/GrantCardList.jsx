import React, { useContext, useEffect, useState } from "react";
import { useAxios } from "../hooks";
import { CUSTOMER_GRANT } from "../utils/operation";
import { useNavigate } from "react-router-dom";
import { SystemContext } from "../context/SystemContext";
import { Button } from "antd";

const serverQueryParams = (current, pageSize, search, serverPaging = true) => {
  if (serverPaging === true)
    return (
      `?page=${current}&pageSize=${pageSize}` + (search ? "&" + search : "")
    );
  else return search ? "?" + search : "";
};

const GrantCardList = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(SystemContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  const fetch = (pagination) => {
    setLoading(true);
    const { current, pageSize } = pagination;
    const queryParam = serverQueryParams(current, pageSize, "", true);
    useAxios(CUSTOMER_GRANT + queryParam, {}, { showLoader: false })
      .then((res) => {
        setDataSource(res.list);
        setPagination({
          current: current,
          pageSize: pageSize,
          total: res.rowCount,
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch(pagination);
  }, []);

  const onChangePagination = (current, pageSize) => {
    const page = { current, pageSize, total: pagination.total };
    setPagination((prev) => {
      return {
        ...prev,
        ...page,
      };
    });

    fetch(page);
  };

  const onClick = (row) => {
    // todo энэ тэтгэлэг дээр хүсэлт явуулсан эсэхийг шалгахаа шийдээгүй
    if (loggedIn === 2) {
      navigate("/login");
    } else {
      navigate(`/request/${row.grantId}`);
    }
  };

  return (
    <div>
      <div className="container flex flex-wrap pt-[150px]">
        {/* <div className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/4 flex flex-col">
          <div className="flex flex-grow">
            <div className="triangle"></div>
            <div className="flex flex-col bg-white border border-gray-400 text">
              <img
                src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                alt="Headless UI"
                className="w-full h-32 object-cover"
              />
              <div className="px-4 py-6 flex flex-grow flex-col justify-between">
                <div>
                  <a
                    href="#"
                    className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    Reliable Schemas
                  </a>
                  <a
                    href="#"
                    className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    What Zombies Can Teach You About Food
                  </a>
                  <p className="mb-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla delectus corporis commodi aperiam, amet cupiditate?
                  </p>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                  >
                    Read More -
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {dataSource.map((item) => {
          return (
            <div
              key={item.grantId}
              className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/4 flex flex-col"
            >
              <div className="flex flex-grow">
                <div className="triangle"></div>
                <div className="flex flex-col bg-white border border-gray-400 text">
                  <div className="w-full h-32 bg-gradient-to-br from-[#7a51d2] to-[#008080] flex items-center justify-center">
                    <h4 className="text-white font-bold text-1xl leading-tight px-8">
                      {item.title}
                    </h4>
                  </div>
                  {/* <img
                      src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                      alt="Headless UI"
                      className="w-full h-32 object-cover"
                    /> */}
                  <div className="px-4 py-6 flex flex-grow flex-col justify-between">
                    <div>
                      <a
                        href="#"
                        className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-primary-60 hover:text-primary-60"
                      >
                        Global Fund for Women
                      </a>
                      <a
                        href="#"
                        className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-primary-60"
                      >
                        {item.title}
                      </a>
                      <p className="mb-4">{item.body}</p>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-block pb-1 mt-2 text-base font-black text-primary-40 uppercase border-b border-transparent hover:border-primary-60 hover:text-primary-60"
                        onClick={() => onClick(item)}
                      >
                        Хүсэлт илгээх
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* <img
                src="https://tailwindcss.com/_next/static/media/heroicons@75.4a558f35.jpg"
                alt="Heroicons"
                className="w-full h-32 object-cover"
              /> */}
        {/* <div className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/4 flex flex-col">
          <div className="flex flex-grow">
            <div className="triangle"></div>
            <div className="flex flex-col bg-white border border-gray-400">
              <div className="w-full h-32 bg-gradient-to-br from-[#7a51d2] to-[#008080] flex items-center justify-center">
                <h4 className="text-white font-bold text-1xl leading-tight ">
                  Welcome to our <br />
                  Colorful World
                </h4>
              </div>
              <div className="px-4 py-6 flex flex-grow flex-col justify-between">
                <div className=" ">
                  <a
                    href="#"
                    className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    Client-based Adoption
                  </a>
                  <a
                    href="#"
                    className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    Old School Art
                  </a>
                  <p className="mb-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla delectus.
                  </p>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                  >
                    Read More -
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/4 flex flex-col">
          <div className="flex flex-grow">
            <div className="triangle"></div>
            <div className="flex flex-col bg-white border border-gray-400">
              <img
                src="https://tailwindcss.com/_next/static/media/heropatterns@75.82a09697.jpg"
                alt="Hero Patterns"
                className="w-full h-32 object-cover"
              />
              <div className="px-4 py-6 flex flex-grow flex-col justify-between">
                <div>
                  <a
                    href="#"
                    className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    Intellectual Capital
                  </a>
                  <a
                    href="#"
                    className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    5 Things To Do About Rain
                  </a>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ratione, neque. Eius, ea possimus.
                  </p>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                  >
                    Read More -
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/4 flex flex-col">
          <div className="flex flex-grow">
            <div className="triangle"></div>
            <div className="flex flex-col bg-white border border-gray-400">
              <img
                src="https://tailwindcss.com/_next/static/media/heropatterns@75.82a09697.jpg"
                alt="Hero Patterns"
                className="w-full h-32 object-cover"
              />
              <div className="px-4 py-6 flex flex-grow flex-col justify-between">
                <div>
                  <a
                    href="#"
                    className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    Intellectual Capital
                  </a>
                  <a
                    href="#"
                    className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    5 Things To Do About Rain
                  </a>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ratione, neque. Eius, ea possimus.
                  </p>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                  >
                    Read More -
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="container">
        <Button style={{ width: "100%" }} size="large" loading={loading}>
          Дараагийнх
        </Button>
      </div>
      <br />
    </div>
  );
};

export default GrantCardList;
