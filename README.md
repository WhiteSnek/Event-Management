# Event Management Application

## Overview
This is a feature-rich event management application that allows users to add, edit, and delete events for any day. The application ensures that events on the same day do not overlap. Users can download all events in CSV format for easy data sharing and management.

### Features:
- **Add Events**: Add events to any day by specifying the event name, description, start time, and end time.
- **Edit Events**: Modify the details of existing events.
- **Delete Events**: Remove unwanted events from any day.
- **Multiple Events per Day**: Add multiple events to a single day, ensuring no overlap in timings.
- **Event Marking**: Days with events are visually marked.
- **Download Events**: Export all events in CSV format with a single click from the top-right corner.

## Deployed Link
[Access the Event Management Application Here](#)

## Running the Application Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.
- [Docker](https://www.docker.com/) installed for containerized deployment.

### Steps to Run Locally Using NPM
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/event-management.git
   cd event-management
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

### Steps to Run Locally Using Docker
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/event-management.git
   cd event-management
   ```

2. **Build the Docker Image**:
   ```bash
   docker build -t event-management .
   ```

3. **Run the Docker Container**:
   ```bash
   docker run -p 5173:5173 event-management
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

## Project Structure
```
.
├── public          # Static assets
├── src             # Source code
│   ├── components  # Reusable components
│       ├── ui      # For ShadCn ui components
│   ├── context     # Context providers
├── package.json    # NPM dependencies
├── Dockerfile      # Docker configuration
└── README.md       # Project documentation
```

## Usage
1. Navigate to any day on the calendar.
2. Click on the day to add a new event.
3. Provide the event details (name, description, start time, and end time).
4. Edit or delete events as needed.
5. Download all events in CSV format using the "Download Data" button in the top-right corner.


