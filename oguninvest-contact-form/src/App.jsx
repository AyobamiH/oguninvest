import { useState } from "react";
import { Helmet } from "react-helmet-async";
const country = "Nigeria";
const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT Abuja"
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    sector: "",
    state: "",
    message: "",
    contactMethod: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 3) return alert("Max 3 files allowed");
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    selectedFiles.forEach((file) => formDataObj.append("files", file));

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        body: formDataObj,
      });
      const result = await response.json();
      alert(result.message || "Inquiry sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Helmet>
        <title>Investor Contact Form</title>
        <meta name="description" content="Submit your investor inquiry form to get in touch with us." />
        <meta name="keywords" content="investor, inquiry, contact, Nigeria, investment" />
      </Helmet>
    
    <div className="flex justify-center items-center min-h-screen bg-white px-6 py-12">
       
      <div className="p-10 w-full max-w-2xl shadow-lg border rounded-2xl bg-white flex flex-col justify-center items-center">
        <h2 className="text-green-700 text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form className="grid grid-cols-1 gap-6 w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input className="border p-3 rounded" name="firstName" placeholder="First Name" required onChange={handleChange} />
            <input className="border p-3 rounded" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          </div>
          <input className="border p-3 rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input className="border p-3 rounded" type="text" name="phone" placeholder="Phone Number (Optional)" onChange={handleChange} />
          <input className="border p-3 rounded" name="company" placeholder="Company Name" required onChange={handleChange} />
          <select className="border p-3 rounded" name="sector" required onChange={handleChange}>
            <option value="">Select Sector</option>
            <option>Real Estate</option>
            <option>Manufacturing</option>
            <option>ICT </option>
            <option>Agriculture</option>
            <option>Infrastucture</option>
            <option>Transportation</option>
            <option>Renewable Energy</option>
            <option>Others</option>
            
          </select>
          <select className="border p-3 rounded" name="country" disabled>
            <option value="Nigeria">Nigeria</option>
          </select>
          <select className="border p-3 rounded" name="state" required onChange={handleChange}>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <textarea className="border p-3 rounded h-32" name="message" placeholder="How may we assist you?" required onChange={handleChange} />
          <input className="border p-3 rounded" type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.doc,.docx" onChange={handleFileChange} />
          <select className="border p-3 rounded" name="contactMethod" required onChange={handleChange}>
            <option value="">Preferred Contact Method</option>
            <option>Email</option>
            <option>Phone Call</option>
            <option>In-person Meeting</option>
          </select>
          <button className="bg-yellow-500 text-white w-full p-4 rounded-lg font-bold hover:bg-green-600" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
