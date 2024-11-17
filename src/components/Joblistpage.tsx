import React from 'react';

const JobListPage: React.FC = () => {
    const jobs = [
        { title: "Frontend Developer", location: "Remote", type: "Full-time" },
        { title: "Backend Developer", location: "Tokyo", type: "Part-time" },
    ];

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">求人一覧</h2>
            <div className="grid gap-4">
                {jobs.map((job, index) => (
                    <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <p>{job.location}</p>
                        <p>{job.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobListPage;
