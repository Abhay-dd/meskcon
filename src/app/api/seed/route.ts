import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { SpeakerModel } from "@/models/Speaker";
import { CommitteeMemberModel } from "@/models/CommitteeMember";
import { ImportantDateModel } from "@/models/ImportantDate";
import { SiteSettingsModel } from "@/models/SiteSettings";

const SPEAKERS_DATA = [
  // International Speakers
  { name: "Dr. Noor Zahirah Mohd Sidek", role: "Professor & Senior Administrator", organization: "Universiti Teknologi MARA (UiTM), Kedah Branch", country: "Malaysia", countryCode: "MY", speakerType: "international", isKeynote: true, order: 1 },
  { name: "Dr. Warren A", role: "President & CEO", organization: "Golden State College", country: "Philippines", countryCode: "PH", speakerType: "international", isKeynote: true, order: 2 },
  { name: "Dr. Josie Yap-Tirador", role: "Vice President for Academic Affairs", organization: "Goldenstate College", country: "Philippines", countryCode: "PH", speakerType: "international", isKeynote: false, order: 3 },
  { name: "Dr. Ferdinand G. Alcantara", role: "Administrator", organization: "Goldenstate College", country: "Philippines", countryCode: "PH", speakerType: "international", isKeynote: false, order: 4 },
  { name: "Mr. Elmer M. Baloyo", role: "Program Head, IT Education", organization: "Goldenstate College", country: "Philippines", countryCode: "PH", speakerType: "international", isKeynote: false, order: 5 },
  { name: "Dr. Alok Atreya", role: "Professor", organization: "Lumbini Medical College", country: "Nepal", countryCode: "NP", speakerType: "international", isKeynote: false, order: 6 },
  { name: "Dr. Nadeesha Gunawardana", role: "Professor", organization: "Beijing Foreign Studies University", country: "China", countryCode: "CN", speakerType: "international", isKeynote: false, order: 7 },
  { name: "Dr. Miguel Farias", role: "Associate Professor", organization: "Coventry University", country: "United Kingdom", countryCode: "GB", speakerType: "international", isKeynote: false, order: 8 },
  { name: "Dr. Rijeesh Kizhakidathazhath", role: "Senior Lecturer", organization: "University of Luxembourg", country: "Luxembourg", countryCode: "LU", speakerType: "international", isKeynote: false, order: 9 },
  { name: "Dr. Aravind Puthirath Balan", role: "Postdoctoral Associate", organization: "Rice University, Houston", country: "USA", countryCode: "US", speakerType: "international", isKeynote: false, order: 10 },
  { name: "Prof. Dr. Md. Mamun Habib", role: "Professor", organization: "Independent University", country: "Bangladesh", countryCode: "BD", speakerType: "international", isKeynote: false, order: 11 },
  { name: "Ayidh Al Harbi", role: "Process Control Engineer", organization: "SABIC Group", country: "Saudi Arabia", countryCode: "SA", speakerType: "international", isKeynote: false, order: 12 },
  { name: "Jobish Vallikavungal", role: "Professor", organization: "Tecnológico de Monterrey University", country: "Mexico", countryCode: "MX", speakerType: "international", isKeynote: false, order: 13 },
  { name: "Chandan Kumar Jha", role: "Associate Professor", organization: "Le Moyne College, New York", country: "USA", countryCode: "US", speakerType: "international", isKeynote: false, order: 14 },
  { name: "Dr. Abdurahman A K", role: "Assistant Professor", organization: "Uzbekistan State World Languages University, Tashkent", country: "Uzbekistan", countryCode: "UZ", speakerType: "international", isKeynote: false, order: 15 },
  // National Speakers
  { name: "Prof. (Dr). B Ananthakrishnan", role: "Vice Chancellor", organization: "Kerala Kalamandalam (Deemed to be University)", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 16 },
  { name: "R. Rajagopal", role: "Former Editor", organization: "The Telegraph", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 17 },
  { name: "Dr. Dilbag Singh", role: "Director of Research and Development", organization: "Starex University, Gurugram", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 18 },
  { name: "Dr. Ranjithkumar", role: "Professor", organization: "CMR University, Bengaluru", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 19 },
  { name: "Dr. V. Ganesh", role: "Senior Principal Scientist", organization: "CSIR-CECRI, Karaikudi, Tamil Nadu", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 20 },
  { name: "Dr. Hitesh A. Solanki", role: "Professor", organization: "Gujarat University", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 21 },
  { name: "Dr. P.K Abdul Rahiman", role: "Head, JBAS Centre for Islamic Studies", organization: "University of Madras", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 22 },
  { name: "Dr. M. Elayaraja", role: "Professor", organization: "Pondicherry University", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 23 },
  { name: "Dr. E Kumar", role: "Professor, Department of Physics", organization: "Tamil Nadu Open University, Chennai", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 24 },
  { name: "Dr. Jayabalakrishnan", role: "Associate Professor", organization: "Annamalai University, Tamil Nadu", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 25 },
  { name: "Dr. S. Janakiraman", role: "Associate Professor", organization: "Government Arts College (Autonomous), Thanjavur", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 26 },
  { name: "Dr. S. Lakshmanan", role: "Associate Professor (Senior)", organization: "VIT Chennai", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 27 },
  { name: "Dr. Priya K V", role: "Assistant Professor", organization: "SRM University, Andhra Pradesh", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 28 },
  { name: "Dr. C Dhanalakshmi", role: "Associate Professor", organization: "Sri Krishna Arts & Science College, Coimbatore", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 29 },
  { name: "Dr. Naveen Kumar", role: "Senior Veterinary Officer", organization: "Department of Animal Husbandry, Karnataka", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 30 },
  { name: "Dr. A Thahira Banu", role: "Associate Professor", organization: "Gandhigram Rural Institute, Dindigul", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 31 },
  { name: "Dr. Divya Sasidharan", role: "Assistant Professor (Sr. Gd.)", organization: "Amrita Vishwa Vidyapeetham, Coimbatore", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 32 },
  { name: "Dr. Ranjeet K R Singh", role: "Founder and CEO", organization: "Sherlock Institute of Forensic Science, New Delhi", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 33 },
  { name: "Dr. Sumit Chhikara", role: "Assistant Professor", organization: "Chaudhary Ranbir Singh University, Haryana", country: "India", countryCode: "IN", speakerType: "national", isKeynote: false, order: 34 },
];

const COMMITTEE_DATA = [
  // Patrons
  { name: "Dr. P A Fasal Ghafoor", role: "President, MES Kerala", category: "patron", order: 1 },
  { name: "Kunjimoideen KK", role: "General Secretary, MES Kerala", category: "patron", order: 2 },
  { name: "Dr. K A Hashim", role: "Corporate Manager, MES Aided Colleges", category: "patron", order: 3 },
  { name: "Mr. K. C. K Syed Ali", role: "Chairman, College Management Committee", category: "patron", order: 4 },
  { name: "Mr. C U Mujib", role: "Secretary in Charge", category: "patron", order: 5 },
  // Chair
  { name: "Dr. Jasmine P M", role: "Principal & Conference Chair", institution: "MES Kalladi College, Mannarkkad", category: "chair", order: 6 },
  // Coordinator
  { name: "Dr. Nasiya V K", role: "Coordinator", institution: "Department of Economics", category: "coordinator", order: 7, phone: "+91 9747888601" },
  // Joint Coordinators
  { name: "Dr. Muhammed Rafi", role: "Joint Coordinator", institution: "Department of Commerce", category: "joint_coordinator", order: 8, phone: "+91 9947909216" },
  { name: "Dr. Hamzathali", role: "Joint Coordinator", institution: "Department of Arabic", category: "joint_coordinator", order: 9, phone: "+91 9496361545" },
  { name: "Dr. Juliya", role: "Joint Coordinator", institution: "Department of Chemistry", category: "joint_coordinator", order: 10, phone: "+91 8547476721" },
  // Members
  { name: "Dr. Jaleel TK", role: "Vice Principal", category: "member", order: 11 },
  { name: "Dr. Azhar A", role: "IQAC Coordinator", category: "member", order: 12 },
  { name: "Dr. Resmi KR", role: "Department of Physics", category: "member", order: 13 },
  { name: "Dr. Sereena K", role: "Department of Botany", category: "member", order: 14 },
  { name: "Mr. Shihab A.M", role: "Department of Islamic History", category: "member", order: 15 },
  { name: "Mr. Shareef K", role: "Department of History", category: "member", order: 16 },
  { name: "Dr. Girish K.P", role: "Department of Mathematics", category: "member", order: 17 },
  { name: "Mr. Saithalavi P", role: "Department of Mathematics", category: "member", order: 18 },
  { name: "Dr. Zainul Abid T", role: "Department of Islamic History", category: "member", order: 19 },
  { name: "Ms. Asmabi K", role: "Department of Commerce", category: "member", order: 20 },
  { name: "Mr. Mohammed Jaish N P", role: "Department of Commerce", category: "member", order: 21 },
];

const DATES_DATA = [
  { title: "Registration Open", date: new Date("2026-11-15"), description: "Conference registration opens for all participants", status: "active", order: 1, icon: "UserPlus" },
  { title: "Abstract Submission", date: new Date("2026-12-10"), description: "Submit your research abstracts for review", status: "active", order: 2, icon: "FileText" },
  { title: "Acceptance Notification", date: new Date("2026-12-25"), description: "Authors notified of abstract acceptance", status: "upcoming", order: 3, icon: "CheckCircle" },
  { title: "Full Paper Submission", date: new Date("2027-01-10"), description: "Submit complete research papers", status: "upcoming", order: 4, icon: "BookOpen" },
  { title: "End of Registration", date: new Date("2027-01-20"), description: "Last day to register for the conference", status: "upcoming", order: 5, icon: "Clock" },
  { title: "Conference Days", date: new Date("2027-01-29"), description: "MESKCON 2027 — Hybrid International Conference", status: "upcoming", order: 6, icon: "Star" },
];

export async function POST() {
  try {
    await dbConnect();

    // Clear existing data
    await SpeakerModel.deleteMany({});
    await CommitteeMemberModel.deleteMany({});
    await ImportantDateModel.deleteMany({});

    // Seed speakers
    await SpeakerModel.insertMany(SPEAKERS_DATA);

    // Seed committee
    await CommitteeMemberModel.insertMany(COMMITTEE_DATA);

    // Seed important dates
    await ImportantDateModel.insertMany(DATES_DATA);

    // Init site settings if not exists
    const existing = await SiteSettingsModel.findOne({});
    if (!existing) {
      await SiteSettingsModel.create({});
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      counts: {
        speakers: SPEAKERS_DATA.length,
        committee: COMMITTEE_DATA.length,
        dates: DATES_DATA.length,
      },
    });
  } catch (error) {
    console.error("POST /api/seed error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
