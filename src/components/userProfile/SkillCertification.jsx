export default function SkillCertification() {
  return (
    <div className="text-neutral-100 p-6 rounded shadow-lg w-full max-w-2xl bg-gray-600">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-200">Skill</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter a skill"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-200">Certification</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter certification"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-200">Institution</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter institution"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-200">Date</label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
