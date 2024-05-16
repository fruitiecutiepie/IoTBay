// backend/serviceCustomerManagement/customerManagementInitDb.ts
import { db } from '../db/initDb';

export const initCustomerManagementDb = () => {
    // Create the table
    db.exec(`
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            type TEXT NOT NULL CHECK(type IN ('company', 'individual')),
            address TEXT NOT NULL,
            status BOOLEAN NOT NULL DEFAULT true
        );
    `);
    // Insert sample data
    const sampleCustomers = [
        { name: 'Alice Johnson', email: 'alice.johnson@example.com', type: 'individual', address: '123 Elm St, Springfield', status: true },
        { name: 'Bob Smith', email: 'bob.smith@example.com', type: 'company', address: '456 Oak St, Metropolis', status: true },
        { name: 'Charlie Brown', email: 'charlie.brown@example.com', type: 'individual', address: '789 Pine St, Gotham', status: false },
        { name: 'David Tenant', email: 'david.tenant@example.com', type: 'company', address: '101 Maple St, Star City', status: true },
        { name: 'Eva Green', email: 'eva.green@example.com', type: 'individual', address: '234 Lake St, Smallville', status: true },
        { name: 'Frank Castle', email: 'frank.castle@example.com', type: 'company', address: '567 Hill St, Coast City', status: false },
        { name: 'Grace Park', email: 'grace.park@example.com', type: 'individual', address: '678 River St, Central City', status: true },
        { name: 'Henry Gale', email: 'henry.gale@example.com', type: 'company', address: '789 Meadow St, National City', status: false },
        { name: 'Ivy Pepper', email: 'ivy.pepper@example.com', type: 'individual', address: '890 Forest St, Emerald City', status: true },
        { name: 'Jack Sparrow', email: 'jack.sparrow@example.com', type: 'individual', address: '901 Ocean St, Atlantis', status: false },
        { name: 'Kate Marsh', email: 'kate.marsh@example.com', type: 'company', address: '123 Creek St, Twin Peaks', status: true },
        { name: 'Lucas Scott', email: 'lucas.scott@example.com', type: 'individual', address: '234 Valley St, Hill Valley', status: true },
        { name: 'Mia Hall', email: 'mia.hall@example.com', type: 'company', address: '345 Mountain St, Pandora', status: false },
        { name: 'Nina Sayers', email: 'nina.sayers@example.com', type: 'individual', address: '456 Cliff St, Silent Hill', status: true },
        { name: 'Olivia Dunham', email: 'olivia.dunham@example.com', type: 'company', address: '567 Shore St, Capeside', status: true },
        { name: 'Peter Bishop', email: 'peter.bishop@example.com', type: 'individual', address: '678 Bluff St, Eureka', status: false },
        { name: 'Quinn Fabray', email: 'quinn.fabray@example.com', type: 'company', address: '789 Dune St, Neptune', status: true },
        { name: 'Rachel Green', email: 'rachel.green@example.com', type: 'individual', address: '890 Glade St, Bon Temps', status: true },
        { name: 'Steve Rogers', email: 'steve.rogers@example.com', type: 'company', address: '901 Plateau St, Sunnydale', status: false },
        { name: 'Tony Stark', email: 'tony.stark@example.com', type: 'individual', address: '123 Heights St, Gotham', status: true }
    ];

    sampleCustomers.forEach(customer => {
        db.run(`
            INSERT OR IGNORE INTO customers (name, email, type, address, status) VALUES (?, ?, ?, ?, ?)
        `, [customer.name, customer.email, customer.type, customer.address, customer.status]);
    });
};