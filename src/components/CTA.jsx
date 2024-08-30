import React from "react";

const CTA = () => {
    const handleStartTrial = (e) => {
        e.preventDefault();
        console.log("Free trial started");
    };

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
                <div className="grid items-center gap-8 md:grid-cols-2 xl:gap-16">
                    <img
                        className="w-full"
                        src="/src/assets/bg.png"
                        alt="Music analytics dashboard"
                        loading="lazy"
                    />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
                            Unlock Your Music's Potential
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg">
                            Dive deep into your music's performance with
                            cutting-edge analytics. Our tools help you connect
                            with your audience, understand your metrics, and
                            grow your musical career.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300"
                            onClick={handleStartTrial}
                        >
                            Start Free Trial
                            <svg
                                className="ml-2 -mr-1 h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
