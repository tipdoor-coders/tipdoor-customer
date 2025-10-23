import React, { useState } from 'react'

const MyAccount = () => {
    const [formData, setFormData] = useState({
        name: "Shriman Udaaharan",
        email: "Shriman.udaaharan@example.com",
        phone: "+91 984-567-8910",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted: ", formData);
    };

    return (
        <main className='p-5'>
            <section className="account-section flex justify-evenly flex-wrap">
                {/* <!-- Sidebar with account options --> */}
                <div className="account-sidebar md:w-1/5 w-full mb-5 p-5 bg-linear-110 from-[#5e17eb] to-[#5f18eb66] rounded-lg text-white">
                    <h3 className='text-xl font-bold mb-4'>Account Navigation</h3>
                    <ul>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Order History</a></li>
                        <li><a href="#">Account Settings</a></li>
                        <li><a href="#">Payment Methods</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </div>

                {/* <!-- Account details or form --> */}
                <div className="account-details md:w-1/2 w-full p-5 bg-linear-125 from-[#5e17eb] to-[#5f18eb66] rounded-lg">
                    <h2 className='text-2xl font-bold mb-5 text-white'>My Account</h2>
                    <p className='text-lg text-white'><strong>Name:</strong> {formData.name}</p>
                    <p className='text-lg text-white'><strong>Email:</strong> {formData.email}</p>
                    <p className='text-lg text-white'><strong>Phone:</strong> {formData.phone}</p>

                    <h3 className='my-5 text-white'>Edit Profile</h3>
                    <form className="account-form" id="profile-form" action="#" method="POST">
                        <label className='mb-1.5 text-white block' htmlFor="name">Full Name:</label>
                        <input
                            className='bg-white w-11/12 p-2.5 mb-5 border border-white rounded-md'
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label className='mb-1.5 text-white block' htmlFor="email">Email Address:</label>
                        <input
                            className='bg-white w-11/12 p-2.5 mb-5 border border-white rounded-md'
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label className='mb-1.5 text-white block' htmlFor="phone">Phone Number:</label>
                        <input
                            className='bg-white w-11/12 p-2.5 mb-5 border border-white rounded-md'
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <button
                            className='max-md:w-11/12 bg-green-500 text-white py-2 px-5 border-none cursor-pointer rounded hover:bg-green-600'
                            type="submit"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </section>
        </main>

    )
}

export default MyAccount
