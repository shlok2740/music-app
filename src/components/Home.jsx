import { FaMusic, FaUser, FaClock } from "react-icons/fa";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                    Unlock Your Music Insights
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                                    Dive deep into your listening habits with
                                    our advanced music analytics platform.
                                    Discover trends, explore your taste, and
                                    understand your musical journey.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Get Started
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Your Listening Snapshot
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="bg-gray-100 p-6 rounded-lg shadow">
                                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <h3 className="text-sm font-medium">
                                        Top Track
                                    </h3>
                                    <FaMusic className="h-4 w-4 text-gray-500 " />
                                </div>
                                <div className="text-2xl font-bold">
                                    Blinding Lights
                                </div>
                                <p className="text-xs text-gray-500 ">
                                    by The Weeknd
                                </p>
                                <p className="text-xs text-gray-500 ">
                                    Played 47 times this week
                                </p>
                            </div>
                            <div className="bg-gray-100  p-6 rounded-lg shadow">
                                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <h3 className="text-sm font-medium">
                                        Top Artist
                                    </h3>
                                    <FaUser className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="text-2xl font-bold">
                                    Taylor Swift
                                </div>
                                <p className="text-xs text-gray-500">
                                    5 albums in your top 100
                                </p>
                                <p className="text-xs text-gray-500">
                                    23 hours listened this month
                                </p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow">
                                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <h3 className="text-sm font-medium">
                                        Listening Time
                                    </h3>
                                    <FaClock className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="text-2xl font-bold">
                                    37 hours
                                </div>
                                <p className="text-xs text-gray-500">
                                    This week
                                </p>
                                <p className="text-xs text-gray-500">
                                    +5% from last week
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Powerful Analytics at Your Fingertips
                                </h2>
                                <ul className="grid gap-4">
                                    <li>
                                        <strong>Track Analysis:</strong> Dive
                                        deep into your most played songs and
                                        discover hidden gems in your library.
                                    </li>
                                    <li>
                                        <strong>Artist Insights:</strong>{" "}
                                        Explore your favorite artists and see
                                        how your tastes evolve over time.
                                    </li>
                                    <li>
                                        <strong>Album Deep Dives:</strong>{" "}
                                        Understand your listening patterns
                                        across different albums and genres.
                                    </li>
                                    <li>
                                        <strong>Time-based Trends:</strong>{" "}
                                        Visualize your listening habits by time
                                        of day, week, or year.
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">
                                        Start Your Musical Journey Today
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Sign up now to unlock the full potential
                                        of your music data and gain insights
                                        like never before.
                                    </p>
                                </div>
                                <div className="w-full max-w-sm space-y-2">
                                    <form className="flex space-x-2">
                                        <input
                                            className="px-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                            placeholder="Enter your email"
                                            type="email"
                                        />
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            type="submit"
                                        >
                                            Sign Up
                                        </button>
                                    </form>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        By signing up, you agree to our Terms of
                                        Service and Privacy Policy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 Music Analytics Inc. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Terms of Service
                    </a>
                    <a
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Privacy
                    </a>
                </nav>
            </footer>
        </div>
    );
}
