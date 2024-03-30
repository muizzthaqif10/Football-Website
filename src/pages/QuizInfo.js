import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function QuizInfo() {
  const [quizInfo, setQuizInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [attemptByUser, setAttemptByUser] = useState();
  const navigate = useNavigate();
  const [attemptUser, setAttemptUser] = useState();
  const { authState } = useContext(AuthContext);
  // const [quizState, setQuizState] = useState({
  //   id: 0,
  //   status: false,
  // });
  const [quizIdToNavigate, setQuizIdToNavigate] = useState(null);
  const { id } = authState;
  const { quizId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/quiz/byId/${quizId}`)
      .then((response) => {
        setQuizInfo(response.data);
        // Assuming you have quizId from quizInfo or elsewhere
        // const quizId = response.data.id; // Get quizId from response data
        // Fetch attempt using quizId and userId
        console.log(response.data);
        axios
          .get(`http://localhost:3001/attempt/${id}/${quizId}`)
          .then((response) => {
            console.log("",response.data);
            setAttemptUser(response.data);
          })
          .catch((error) => {
            console.error("Error fetching attempt:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }, [id]);

  const startAttempt = (quizId) => {
    axios
      .get(`http://localhost:3001/attempt/${id}/${quizId}`)
      .then((response) => {
        console.log("xxx", response.data);
        const attemptLength = response.data.length; // Store the attempt length in a variable
        setAttemptByUser(attemptLength); // Update the state variable

        const data = {
          userId: id,
          quizId: quizId,
          score: 0,
          attemptedAt: new Date().toISOString(),
        };

        axios.post("http://localhost:3001/attempt", data).then((response) => {
          console.log(response);
          navigate(
            `/quiz/${quizId}?attemptLength=${attemptLength + 1}&attemptId=${
              response.data.id
            }`
          ); // Pass the attempt length directly to navigate
        });
      });
  };

  const handleConfirmAttempt = (quizId) => {
    // Show modal and set quizId to navigate after confirmation
    setShowModal(true);
    setQuizIdToNavigate(quizId);
  };

  const handleModalConfirm = () => {
    startAttempt(quizIdToNavigate);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* <QuizContext.Provider value={(quizState, setQuizState)}> */}
      <div className="w-full bg-black min-h-screen p-8 sm:p-24">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          className="fixed inset-0 object-cover w-full h-full z-0"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {quizInfo && (
          <div className="relative z-10">
            <p className="text-3xl text-white text-center font-bold tracking-wider mb-[2rem]">
              {quizInfo.title}
            </p>
            <div className="grid w-full lg:grid-cols-2 text-white gap-[3rem] h-full ">
              {/* Text */}

              <div className="z-10">
                {/* <p>{quizInfo.description}</p> */}

                {quizInfo.id === 1 && (
                  <div className="w-full flex flex-col gap-4 mt-[4rem]">
                    <div className="flex flex-col gap-4">
                      <div className="p-2 flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  flex-col gap-4">
                          <p className="text-lg font-thin ">
                            Adding integers is straightforward and involves
                            combining values to find their sum. When we add
                            integers, we are essentially "combining" or
                            "joining" them together.
                          </p>
                        </div>
                      </div>

                      <div className="p-2 flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  flex-col gap-4">
                          <p className="text-lg font-thin ">
                            Subtracting integers is very similar to adding
                            integers. This is because when we subtract integers,
                            we will "add the opposite".
                          </p>
                        </div>
                      </div>

                      <div className="p-2 flex justify-start items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  gap-[3rem]">
                          <div className="flex flex-col">
                            <p className="text-lg font-thin ">
                              x+ (+y) = x + y
                            </p>
                            <p className="text-lg font-thin ">
                              x+ (-y) = x - у
                            </p>
                            <p className="text-lg font-thin ">
                              x- (+y) = x - у
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-lg font-thin ">
                              x- (-y) = x + y
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {quizInfo.id === 2 && (
                  <div className="w-full flex flex-col gap-4 mt-[4rem]">
                    <div className="flex flex-col gap-4">
                      <div className="p-2 flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  flex-col gap-4">
                          <p className="text-lg font-thin ">
                            Multiplication of integers is like combining groups
                            of numbers. If multiplying two positive numbers or
                            two negative numbers together, get a positive
                            answer. If multiplying a positive number with a
                            negative number, the result is negative.
                          </p>
                        </div>
                      </div>

                      <div className="p-2 flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  flex-col gap-4">
                          <p className="text-lg font-thin ">
                            Division of integers is like sharing or splitting
                            numbers into equal groups. When you divide two
                            positive or two negative numbers, you get a positive
                            answer. But when you divide a positive number by a
                            negative number, or vice versa, the result is
                            negative.
                          </p>
                        </div>
                      </div>

                      <div className="p-2 flex justify-start items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  gap-[3rem]">
                          <div className="flex flex-col">
                            <p className="text-lg font-thin ">2 × 3 = 6</p>
                            <p className="text-lg font-thin ">-3 × -4 = 12</p>
                            <p className="text-lg font-thin ">-3 × 5 = -15</p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-lg font-thin ">9 ÷ 3 = 3</p>
                            <p className="text-lg font-thin ">-4 ÷ -2 = 2</p>
                            <p className="text-lg font-thin ">-10 ÷ 5 = -2</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {quizInfo.id === 3 && (
                  <div className="w-full flex flex-col gap-4 mt-[4rem]">
                    <div className="flex flex-col gap-4">
                      <div className="p-2 flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  flex-col gap-4">
                          <p className="text-lg font-thin ">
                            Adding and subtracting fractions means finding the
                            sum or the difference of two or more fractions. In
                            order to do this, the fractions must have a common
                            denominator (bottom number). The numerator shows the
                            number of parts out of the whole and the denominator
                            shows how many equal parts the whole is divided
                            into.
                          </p>
                        </div>
                      </div>

                      <div className="p-2 flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  flex-col gap-4">
                          <p className="text-lg font-thin ">
                            Multiplying and dividing fractions means using
                            multiplication and division to calculate with
                            fractions. Fraction multiplication and division can
                            be solved using models or an algorithm.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {quizInfo.id === 4 && (
                  <div className="w-full flex flex-col gap-4 mt-[4rem]">
                    <div className="flex flex-col gap-4">
                      <div className="p-2 flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  flex-col gap-4">
                          <p className="text-lg font-thin ">
                            Y = mx+b Where, m determines the slope of that line,
                            b determines the point at which the line crosses.
                            <p className="mt-5">5x + 6 = 11 </p>
                            <p>5x = 11 – 6 </p>
                            <p>5x =5 </p>
                            <p>x= 5/5 </p>
                            <p>x=1</p>
                          </p>
                        </div>
                      </div>

                      <div className="p-2 flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33]">
                        <img
                          src="/bx-math.svg"
                          className="w-[5rem] h-[5rem]  p-4 bg-[#c28f33] rounded-full"
                        ></img>
                        {/* <img src="/bx-medal.svg" className="w-[6rem]"></img> */}

                        <div className="flex  flex-col gap-4">
                          <p className="text-lg font-thin ">
                            ax + b = 0 Where, ‘a’ and ‘b’ are real numbers. Both
                            ‘a’ and ‘b’ are not equal to zero.
                            <p className="mt-5">5x – 9 +3x = 19</p>
                            <p>⇒ 8x -9 = 19</p>
                            <p>8x -9 = 19</p>
                            <p>⇒ 8x = 19 + 9</p>
                            <p>⇒ 8x = 28</p>
                            <p>8x/8 = 28/8</p>
                            <p>⇒ x = 28/8</p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* <button onClick={() => handleConfirmAttempt(quizInfo.id)}>
                  Start Quiz 1
                </button> */}
              </div>
              <div className="z-10">
                {/* <p className="text-3xl font-bold tracking-wider mb-[2rem]">
                  {quizInfo.title}
                </p> */}
                {/* <p>{quizInfo.description}</p> */}

                <div className="w-full flex flex-col gap-4 mt-[4rem]">
                  <div className="flex justify-center items-center gap-4 bg-black rounded-lg border-2 border-[#c28f33] p-4">
                    <div className="flex flex-col items-center gap-4">
                      <img src="/bxs-crown.svg" className="w-[4rem]"></img>
                      <p className="w-full text-2xl font-bold text-center border-b-2 pb-[1rem]">
                        Dashboard
                      </p>
                      {attemptUser &&
                        attemptUser.map((attempt, index) => (
                          <div key={index} className=" flex gap-[6rem] ">
                            <p className="text-xl p-2">Attempt {index + 1}</p>
                            <p className="text-xl bg-white p-2 text-black rounded">
                              Score: {attempt.score}
                            </p>
                          </div>
                        ))}
                      {attemptUser && attemptUser.length >= 3 ? (
                        <button
                          onClick={() => navigate(`/answer/${quizId}`)}
                          className="bg-[#2174ea] text-white font-bold my-[2rem] p-3 rounded"
                        >
                          See Answer
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConfirmAttempt(quizInfo.id)}
                          className="bg-[#2174ea] text-white font-bold my-[2rem] p-3 rounded"
                        >
                          Start Quiz
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* <button onClick={() => handleConfirmAttempt(quizInfo.id)}>
                  Start Quiz 1
                </button> */}
              </div>
              {/* {quizInfo.id === 1 && (
                <Slider
                dots
                infinite
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                className="border-orange-200 relative z-10"
              >
                <div className="flex rounded-lg  relative">
                  <img className="w-[24rem] border-opacity-90 border-[1rem] rounded-lg overflow-hidden object-cover" src="/xquiz1.png" alt="xquiz1" />
                </div>
                <div className="flex border-opacity-90 border-[1rem] rounded-lg border-[#c28f33] relative">
                  <img className="w-full  object-cover" src="/quiz1.png" alt="xquiz1" />
                </div>
              </Slider>
              )}
              {quizInfo.id === 2 && (
                <div>
                  <div className="flex relative z-10">
                    <img className="w-full" src="/quiz2.png"></img>
                  </div>
                </div>
              )}
              {quizInfo.id === 3 && (
                <div>
                  <button onClick={() => handleConfirmAttempt(quizInfo.id)}>
                    Start Quiz 1
                  </button>
                  <div className="flex relative z-10">
                    <img className="w-full" src="/quiz3.jpg"></img>
                  </div>
                </div>
              )}
              {quizInfo.id === 4 && (
                <div>
                  <button onClick={() => handleConfirmAttempt(quizInfo.id)}>
                    Start Quiz 1
                  </button>
                  <div className="flex relative z-10">
                    <img className="w-full" src="/quiz4.png"></img>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        )}
        {/* Modal */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <h2 className="text-lg font-semibold mb-2">
                Are you sure you want to start this quiz?
              </h2>
              <p className="text-red-500 mb-4">
                You cannot go back to another page before the timer ends or
                until you submit the answer
              </p>
              <div className="flex justify-end">
                <button
                  className="text-red-500 hover:text-red-700 font-semibold mr-4"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  className="text-green-500 hover:text-green-700 font-semibold"
                  onClick={handleModalConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Image */}
      </div>
      {/* </QuizContext.Provider> */}
    </div>
  );
}

export default QuizInfo;
