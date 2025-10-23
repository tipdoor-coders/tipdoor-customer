import React from 'react'

const ContactUs = () => {
    return (
        <main className="max-w-[1200px] mx-auto p-5">
            <section className="contact-section ">

                <div className='bg-linear-110 from-[#5e17eb] to-[#5f18eb66] md:w-4/5 w-full mx-auto p-5 rounded-lg shadow-xl text-white'>
                    <h2 className='text-2xl font-bold my-5'>Contact Us</h2>

                    <div className="contact-details px-4">
                        <h3 className='text-xl font-bold my-2'>Our Contact Information</h3>
                        <p><strong>Address:</strong> St no., Place, Delhi, IND</p>
                        <p><strong>Phone:</strong> +91 723-456-7890</p>
                        <p><strong>Email:</strong> support@tipdoor.com</p>
                    </div>

                    <div className="contact-form px-4">
                        <h3 className='text-lg font-bold mt-5'>Send Us a Message</h3>
                        <form action="#" method="POST">
                            <label htmlFor="name">Full Name:</label>
                            <input className="flex w-9/12 p-2.5 my-2 border border-[#ddd] rounded bg-white text-black" type="text" id="name" name="name" placeholder='Your Name' required />

                            <label htmlFor="email">Email Address:</label>
                            <input className="flex w-9/12 p-2.5 my-2 border border-[#ddd] rounded bg-white text-black" type="email" id="email" name="email" placeholder='Your e-mail' required />

                            <label htmlFor="message">Your Message:</label>
                            <textarea className="flex w-9/12 p-2.5 my-2 border border-[#ddd] rounded bg-white text-black" id="message" name="message" placeholder='your message...' rows="4" required></textarea>

                            <button className="bg-[#4CAF50] text-white font-bold px-5 py-2.5 border-none cursor-pointer rounded-sm" type="submit">Send Message</button>
                        </form>
                    </div>
                </div>


                {/* <!-- Optional: Google Map Embed (if you'd like to show a map) --> */}
                <div className="map px-4">
                    <h3 className='text-xl font-bold my-6'>Find Us on the Map</h3>
                    <iframe className="border-0 rounded-lg"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.3844869922684!2d-74.00475568461558!3d40.71277607933008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a19994ec227%3A0x49c9cd119b6d4156!2s123%20Fashion%20St%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sin!4v1620785083126!5m2!1sen!2sin" width="100%" height="400" frameBorder="0" style={{ border: 0 }} allowFullScreen="" loading="lazy" aria-hidden="false" tabIndex="0">
                    </iframe>
                </div>
            </section>
        </main>

    )
}

export default contactUs
