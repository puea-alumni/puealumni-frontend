import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Pencil,
  X,
  Mail,
  GraduationCap,
} from "lucide-react";

import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

interface ProfileFormData {
  name: string;
  graduation_year: string;
  degree: string;
  job_title: string;
  company: string;
  city: string;
  bio: string;
}

const emptyForm: ProfileFormData = {
  name: "",
  graduation_year: "",
  degree: "",
  job_title: "",
  company: "",
  city: "",
  bio: "",
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  // "view" shows the read-only profile, "edit" shows the editable form
  const [mode, setMode] = useState<"view" | "edit">("view");

  const [formData, setFormData] = useState<ProfileFormData>(emptyForm);

  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch the latest profile on load rather than trusting stale localStorage data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        const profile = response.data.data;

        setFormData({
          name: profile.name || "",
          graduation_year: profile.graduation_year?.toString() || "",
          degree: profile.degree || "",
          job_title: profile.job_title || "",
          company: profile.company || "",
          city: profile.city || "",
          bio: profile.bio || "",
        });
      } catch (err: any) {
        console.error(err);
        setError("Could not load your profile. Please try again.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put("/profile", {
        name: formData.name,
        graduation_year: Number(formData.graduation_year),
        degree: formData.degree || null,
        job_title: formData.job_title || null,
        company: formData.company || null,
        city: formData.city || null,
        bio: formData.bio || null,
      });

      const updatedUser = response.data.data;
      updateUser(updatedUser);

      setFormData({
        name: updatedUser.name || "",
        graduation_year: updatedUser.graduation_year?.toString() || "",
        degree: updatedUser.degree || "",
        job_title: updatedUser.job_title || "",
        company: updatedUser.company || "",
        city: updatedUser.city || "",
        bio: updatedUser.bio || "",
      });

      setSuccess("Profile updated successfully.");
      setMode("view");
    } catch (err: any) {
      console.error(err);

      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0] as string[];
        setError(firstError?.[0] || "Could not update profile.");
      } else {
        setError(
          err.response?.data?.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset any unsaved edits back to the last known profile values
    setError("");
    setMode("view");
  };

  const initials = formData.name
    ?.split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-2xl w-full">
        

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm text-center">
            {success}
          </div>
        )}

        {error && mode === "view" && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header / cover */}
          <div className="h-24 bg-gradient-to-r from-[#9333EA] to-[#7c2bbf]" />

          <div className="px-8 pb-8">
            <div className="flex items-end justify-between -mt-12 mb-6">
              <div className="w-24 h-24 rounded-full bg-purple-100 text-[#9333EA] flex items-center justify-center font-semibold text-3xl border-4 border-white shadow-sm">
                {initials || <User className="w-9 h-9" />}
              </div>

              {mode === "view" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSuccess("");
                    setMode("edit");
                  }}
                  className="mt-14 inline-flex items-center gap-2 py-2 px-4 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors font-semibold text-sm"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="mt-14 inline-flex items-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              )}
            </div>

            {mode === "view" ? (
              <ProfileView formData={formData} email={user?.email} />
            ) : (
              <ProfileEditForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onCancel={handleCancelEdit}
                saving={saving}
                error={error}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileView({
  formData,
  email,
}: {
  formData: ProfileFormData;
  email?: string;
}) {
  const details = [
    {
      icon: Mail,
      label: "Email",
      value: email,
    },
    {
      icon: GraduationCap,
      label: "Degree",
      value: formData.degree,
    },
    {
      icon: Calendar,
      label: "Graduation Year",
      value: formData.graduation_year,
    },
    {
      icon: Briefcase,
      label: "Job Title",
      value: formData.job_title,
    },
    {
      icon: Building2,
      label: "Company",
      value: formData.company,
    },
    {
      icon: MapPin,
      label: "City",
      value: formData.city,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        {formData.name || "Unnamed Alumnus"}
      </h2>
      {formData.job_title && (
        <p className="text-gray-500 mt-0.5">
          {formData.job_title}
          {formData.company ? ` at ${formData.company}` : ""}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mt-6 pt-6 border-t border-gray-100">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#9333EA] flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
              <p className={`text-sm ${value ? "text-gray-900" : "text-gray-400 italic"} truncate`}>
                {value || "Not provided"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-[#9333EA]" />
          <p className="text-xs text-gray-400 uppercase tracking-wide">Bio</p>
        </div>
        <p className={`text-sm leading-relaxed ${formData.bio ? "text-gray-700" : "text-gray-400 italic"}`}>
          {formData.bio || "You haven't added a bio yet. Click Edit Profile to introduce yourself."}
        </p>
      </div>
    </div>
  );
}

function ProfileEditForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  saving,
  error,
}: {
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  saving: boolean;
  error: string;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 pt-2">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
              placeholder="Jane Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Year
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="graduation_year"
              type="number"
              required
              min="1950"
              max={new Date().getFullYear()}
              value={formData.graduation_year}
              onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
              placeholder="2020"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
          Degree
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="degree"
            type="text"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
            placeholder="Computer Science"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="job_title"
              type="text"
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
              placeholder="Safaricom"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
          City
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent"
            placeholder="Nairobi"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          rows={4}
          maxLength={1000}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9333EA] focus:border-transparent resize-none"
          placeholder="Passionate about building scalable systems."
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{formData.bio.length}/1000</p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-3 px-4 bg-[#9333EA] text-white rounded-lg hover:bg-[#7c2bbf] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}