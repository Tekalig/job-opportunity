function ContactUs() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-8 bg-gray-100 dark:bg-gray-800">
      <div className="contact-form-section bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg md:w-1/2 mr-4">
        <h2 className="form-header text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          We'd Love to Hear From You
        </h2>
        <div className="icon-placeholder flex justify-center mb-6">
          <div className="green-square h-12 w-12 bg-green-600 dark:bg-green-500 rounded-full"></div>
        </div>
        <form className="contact-form space-y-6">
          <div className="form-group">
            <label htmlFor="name" className="block text-gray-800 dark:text-gray-200 font-medium">
              Your Name <span className="required text-red-600 dark:text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-2 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-gray-800 dark:text-gray-200 font-medium">
              Your Email <span className="required text-red-600 dark:text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-2 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="block text-gray-800 dark:text-gray-200 font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-2 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>
          <button
            type="submit"
            className="submit-btn w-full bg-green-600 dark:bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="contact-info-section bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg md:w-1/3 ml-4 mt-8 md:mt-0">
        <h2 className="info-header text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Contact Information</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          We are here to assist you! Whether you have questions about our services, need help with a transaction, or just want to share your thoughts, feel free to reach out. Our team will respond as soon as possible. Your feedback helps us improve and provide the best experience for you.
        </p>
        <div className="contact-details space-y-6">
          <div className="contact-detail">
            <strong className="block text-gray-800 dark:text-gray-200">📍 Address</strong>
            <p className="text-gray-700 dark:text-gray-300">Addis Ababa, Ethiopia</p>
          </div>
          <div className="contact-detail">
            <strong className="block text-gray-800 dark:text-gray-200">📞 Phone</strong>
            <p className="text-gray-700 dark:text-gray-300">Mobile: +251-949-61-83-38</p>
            <p className="text-gray-700 dark:text-gray-300">OR: +251-964-84-66-09</p>
          </div>
          <div className="contact-detail">
            <strong className="block text-gray-800 dark:text-gray-200">📧 Email</strong>
            <p className="text-gray-700 dark:text-gray-300">aklilubeyero@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
