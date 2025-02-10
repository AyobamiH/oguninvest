import { useState } from "react";

const country = "Nigeria";
const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT Abuja"
];

export default function ContactForm() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 3) return alert("Max 3 files allowed");
    setSelectedFiles([...selectedFiles, ...files]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-6 py-12">
      <div className="p-10 w-full max-w-2xl shadow-lg border rounded-2xl bg-white flex flex-col justify-center items-center">
        <h2 className="text-green-700 text-2xl font-bold mb-6 text-center">Investor Inquiry</h2>
        <form className="grid grid-cols-1 gap-6 w-full">
          <div className="grid grid-cols-2 gap-4">
            <input className="border p-3 rounded" placeholder="First Name" required />
            <input className="border p-3 rounded" placeholder="Last Name" required />
          </div>
          <input className="border p-3 rounded" type="email" placeholder="Email" required />
          <input className="border p-3 rounded" type="text" placeholder="Phone Number (Optional)" />
          <input className="border p-3 rounded" placeholder="Company Name" required />
          <select className="border p-3 rounded" required>
            <option value="">Select Sector</option>
            <option>Real Estate</option>
            <option>Manufacturing</option>
            <option>Technology</option>
            <option>Agriculture</option>
            <option>Others</option>
          </select>
          <select className="border p-3 rounded" required>
            <option value="Nigeria">Nigeria</option>
          </select>
          <select className="border p-3 rounded" onChange={(e) => setSelectedState(e.target.value)} required>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <textarea className="border p-3 rounded h-32" placeholder="How may we assist you?" required />
          <input className="border p-3 rounded" type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.doc,.docx" onChange={handleFileChange} />
          <select className="border p-3 rounded" required>
            <option value="">Preferred Contact Method</option>
            <option>Email</option>
            <option>Phone Call</option>
            <option>In-person Meeting</option>
          </select>
          <button className="bg-yellow-500 text-white w-full p-4 rounded-lg font-bold hover:bg-green-600">Send Inquiry</button>
        </form>
      </div>
    </div>
  );
}
