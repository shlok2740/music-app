import { FaMusic, FaUser, FaClock } from "react-icons/fa";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { useEffect, memo } from "react";
import { Link } from "react-router-dom";

const StatCard = memo(({ title, icon: Icon, value, subtitle1, subtitle2 }) => (
    <div className="bg-gray-100 p-6 rounded-lg shadow">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">{title}</h3>
            <Icon className="h-4 w-4 text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{subtitle1}</p>
        <p className="text-xs text-gray-500">{subtitle2}</p>
    </div>
));

const FeatureList = memo(() => (
    <ul className="grid gap-4">
        <li>
            <strong>Track Analysis:</strong> Dive deep into your most played
            songs and discover hidden gems in your library.
        </li>
        <li>
            <strong>Artist Insights:</strong> Explore your favorite artists and
            see how your tastes evolve over time.
        </li>
        <li>
            <strong>Album Deep Dives:</strong> Understand your listening
            patterns across different albums and genres.
        </li>
        <li>
            <strong>Time-based Trends:</strong> Visualize your listening habits
            by time of day, week, or year.
        </li>
    </ul>
));

const SignUpForm = memo(() => (
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
        <p className="text-xs text-gray-700">
            By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
    </div>
));

export default function Home() {
    useEffect(() => {
        injectSpeedInsights();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-300">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-black">
                                    Unlock Your Music Insights
                                </h1>
                                <p className="mx-auto max-w-[700px] text-black md:text-xl">
                                    Dive deep into your listening habits with
                                    our advanced music analytics platform.
                                    Discover trends, explore your taste, and
                                    understand your musical journey.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link
                                    to="/add-csv"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Upload your Data
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-300">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Your Listening Snapshot
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3">
                            <StatCard
                                title="Top Track"
                                icon={FaMusic}
                                value="Blinding Lights"
                                subtitle1="by The Weeknd"
                                subtitle2="Played 47 times this week"
                            />
                            <StatCard
                                title="Top Artist"
                                icon={FaUser}
                                value="Taylor Swift"
                                subtitle1="5 albums in your top 100"
                                subtitle2="23 hours listened this month"
                            />
                            <StatCard
                                title="Listening Time"
                                icon={FaClock}
                                value="37 hours"
                                subtitle1="This week"
                                subtitle2="+5% from last week"
                            />
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-300">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Powerful Analytics at Your Fingertips
                                </h2>
                                <FeatureList />
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">
                                        Start Your Musical Journey Today
                                    </h3>
                                    <p className="text-gray-700">
                                        Sign up now to unlock the full potential
                                        of your music data and gain insights
                                        like never before.
                                    </p>
                                </div>
                                <SignUpForm />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
