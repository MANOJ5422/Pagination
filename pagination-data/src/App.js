import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(false);
    
    const itemsPerPage = 10;
    const totalPages = 5; // Since there are only 50 items and 5 pages are specified

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
                if (!response.ok) throw new Error('Network response was not ok');
                
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(true);
                alert('failed to fetch data');
            }
        };
        fetchData();
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ display:"flex", justifyContent:"center"}}>Employee Data Table</h2>
            {/* {error ? (
                <p style={{ color: 'red' }}>Failed to load data.</p>
            ) : ( */}
                <>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>ID</th>
                                <th style={tableHeaderStyle}>Name</th>
                                <th style={tableHeaderStyle}>Email</th>
                                <th style={tableHeaderStyle}>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((employee) => (
                                <tr key={employee.id}>
                                    <td style={tableCellStyle}>{employee.id}</td>
                                    <td style={tableCellStyle}>{employee.name}</td>
                                    <td style={tableCellStyle}>{employee.email}</td>
                                    <td style={tableCellStyle}>{employee.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div style={{ marginTop: '40px', textAlign: 'center',display:'flex',justifyContent:"center",alignItems:"center" }}>
                        <button 
                            onClick={handlePrevious} 
                            disabled={currentPage === 1}
                            style={buttonStyle}
                        >
                            Previous
                        </button>
                        <p style={{ width: "20px",height:"20px",padding:"10px", backgroundColor:"#2aa15d",borderRadius:"5px", margin: '0 15px' }}> {currentPage}</p>
                        <button 
                            onClick={handleNext} 
                            disabled={currentPage === totalPages}
                            style={buttonStyle}
                        >
                            Next
                        </button>
                    </div>
                </>
            {/* )} */}
        </div>
    );
}

const tableHeaderStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
   backgroundColor:"#2aa15d",
    
};

const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
};

const buttonStyle = {
    padding: '8px 16px',
    margin: '0 5px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#2aa15d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    opacity: '0.9',
    transition: 'opacity 0.2s',
    ':hover': {
        opacity: '1',
    }
};

export default App;