import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Certifications.css';

export default function Certifications() {
    const [certifications] = useState([
        {
            id: 1,
            name: 'SQL Certification',
            price: 50,
            description: 'Master SQL to manage and query relational databases effectively in modern applications.'
        },
        {
            id: 2,
            name: 'C# Certification',
            price: 60,
            description: 'Learn C# for building powerful and scalable applications across various platforms, including .NET.'
        },
        {
            id: 3,
            name: 'JavaScript Certification',
            price: 40,
            description: 'Develop dynamic web applications by mastering JavaScript, the cornerstone of modern front-end development.'
        },
        {
            id: 4,
            name: 'Python Certification',
            price: 55,
            description: 'Gain proficiency in Python for data science, web development, and automation tasks.'
        },
        {
            id: 5,
            name: 'ITIL 4 Foundation',
            price: 70,
            description: 'A solid foundation for understanding IT service management and its core elements.'
        },
        {
            id: 6,
            name: 'PRINCE2 Risk Management',
            price: 65,
            description: 'Identify, assess, and control risks, to enhance decision-making and resilience.'
        },
    ]);

    const handleBuy = (certification) => {
        alert(`Bought voucher for ${certification.name}`);
    };

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="certifications">
            <h1>Available Certifications</h1>
            <ul>
                {certifications.map((certification) => (
                    <li key={certification.id} className="certification-box">
                        <Link to="/detailed-certifications" className="certification-link">
                            <div>
                                <h2>{certification.name}</h2>
                                <p>{truncateDescription(certification.description, 100)}</p>
                                <p>Price: ${certification.price}</p>
                            </div>
                        </Link>
                        <button onClick={() => handleBuy(certification)}>Buy Voucher</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
