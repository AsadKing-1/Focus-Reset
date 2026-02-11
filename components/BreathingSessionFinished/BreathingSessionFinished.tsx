export default function BreathingSessionFinished() {
    return (
        <div>
            <div className="p-3">
                <h1 className="text-[35px] font-extrabold dark:text-white">Session Complete</h1>
                <p className="text-gray-400">Great Job taking time for yourself</p>
            </div>
            <div className="p-3">
                <div className="mb-10 group">
                    <div className="flex flex-col md:flex-row items-stretch rounded-xl overflow-hidden bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
                        <div className="md:w-1/3 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-6xl text-primary opacity-20">air</span>
                            </div>
                            <div className="w-full h-48 md:h-full bg-center bg-no-repeat bg-cover" data-alt="Calming abstract waves in shades of blue" style={{backgroundImage: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCcH2tsS7rt_ZNJtW5Hg81IzkfNX2OOgCyj9dpFqMwW5F5CSFgEo8hQA6YgEbiBDC3Zq4fcS1tNUIdPXdNRy-dX_U4Wnkt67KzYHfYirZ2HWyzcsSyp_H5_PoTvFcdyE7IzuK3ox4TQiYoDUmL2tOTwE--hozsDvfwsIlSGltdDrtYW_Fb19PV5day08Rx7gRIFCYDtdNwMkZemqD42Ro4lub55Jl5EucY1iELNYeOITsefpif3si6DtegA2adyjb7wheWRIEDrfGYc"}}></div>
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-center gap-4">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}