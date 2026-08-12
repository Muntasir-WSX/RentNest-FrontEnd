# RentNest - Full-Stack Rental Property Marketplace

RentNest is a modern, responsive full-stack web application designed for a rental property marketplace. It bridges tenants, landlords, and administrators, offering an intuitive UI for searching and listing properties, managing rental requests, handling secure payments, and performing robust platform moderation.

---

## 🚀 Quick Links & Submissions

* **Frontend GitHub Repo:** [Insert Link Here]
* **Live Frontend URL (Vercel):** [Insert Link Here]
* **Backend API URL:** [Insert Link Here]
* **Demo Video (7-10 min):** [Insert Link Here]

---

## 🔑 Demo Credentials

Use the following credentials to test different user roles across the platform:

| Role | Email | Password |
| --- | --- | --- |
| **Admin** | `admin@rentnest.com` | `admin123` |
| **Landlord** | `jomidar@gmail.com` *(or `landlord@rentnest.com` )* | `123456` *(or `landlord123 `)* |
| **Tenant** | `tenant@rentnest.com` | `tenant123` |

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS, Lucide Icons, Sonner (Toasts), SweetAlert2
* **Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL
* **Authentication:** JWT (JSON Web Tokens) with Secure HTTP-Only Cookies
* **Payments:** Stripe / SSLCommerz Integration
* **Deployment:** Vercel (Frontend)

---

## 🔄 Full-Stack Workflow

1. **Authentication & Authorization Workflow:**
* Users register or log in via dedicated forms with validation.
* Upon successful authentication, the backend issues an access token stored securely via HTTP-only cookies.
* Next.js Middleware and role-based route guards protect private paths (Tenant, Landlord, and Admin dashboards).


2. **Tenant Discovery & Rental Request Workflow:**
* Tenants browse available listings on the responsive property grid, applying real-time filters (location, price range, and amenities).
* From the Property Details page, tenants submit a "Request to Rent" form.
* Tenants track their request status (Pending, Approved, Rejected, Active) in their personal dashboard.


3. **Payment & Lease Activation Workflow:**
* Once a landlord approves a rental request, a "Proceed to Payment" CTA becomes active for the tenant.
* The tenant is securely redirected to the payment gateway (Stripe/SSLCommerz).
* Successful payments route to `/payment/success`, updating the lease status and recording transaction details in the database.


4. **Landlord Management Workflow:**
* Landlords manage their property portfolio through a dedicated dashboard (create, edit, toggle availability, and remove listings).
* They review incoming tenant requests and execute "Approve" or "Reject" actions, instantly triggering status updates.


5. **Admin Moderation Workflow:**
* Administrators oversee platform health via a global analytics overview.
* The User Management table allows searching, inspecting, and toggling user account status (**Ban / Unban** with safety safeguards).



---

## 📱 Key Features

### 👤 Tenant Features

* **Responsive Property Grid:** Clean cards featuring optimized images, prices, locations, and amenities.
* **Advanced Search & Filter:** Sidebar/top-bar controls for sorting by price and filtering locations seamlessly.
* **Interactive Rental & Payment Flow:** Streamlined request submission, secure checkout redirection, and success/cancel feedback pages.
* **Tenant Dashboard:** Centralized view for tracking rental history, payment tables, and review submissions.

### 🏠 Landlord Features

* **Earnings & Metrics Overview:** High-level summary of properties, requests, and performance.
* **Property CRUD Operations:** Complete form interfaces for managing listings and image uploads.
* **Request Moderation:** Actionable data tables to approve or deny incoming tenant requests with live toast notifications.

### 🛡️ Admin Features

* **Global Platform Dashboard:** Health indicators showcasing user growth and platform stats.
* **User Moderation:** Comprehensive user listing with active/banned status indicators and secure state toggles.
* **Content Oversight:** Deep inspection views across listings and transactions.

---

## 📦 Getting Started Locally

To run this project locally on your machine:

1. **Clone the repository:**
```bash
git clone <repository-url>
cd rent-nest

```


2. **Install dependencies:**
```bash
npm install
# or yarn install / pnpm install

```


3. **Configure Environment Variables:**
Create a `.env` file in your root/backend directory and configure your database string, JWT secrets, and API endpoints.
4. **Run the development server:**
```bash
npm run dev

```


5. Open [http://localhost:3000](http://localhost:3000) in your browser.