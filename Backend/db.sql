-- Insert data into the `users` table
INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'testuser@example.com', '$2b$12$bh0fsetXTGOx..HkkE/cruSNluSV.8kD8N8arPObTjDutUvBXgX/y', 'user', NOW(), NOW());

-- Insert data into the `transactions` table
INSERT INTO `transactions` (`id`, `amount`, `description`, `category`, `date`, `type`, `assetClass`, `assetName`, `accountNumber`, `cardNumber`, `logo`, `transactionType`, `createdAt`, `updatedAt`, `userId`) VALUES
(UUID(), 200.00, 'Groceries shopping', 'shopping', '2024-12-01 14:30:00', 'expense', 'Bank', 'Chase Bank', '1234567890', '1234567890', 'https://example.com/logo1.png', 'debit', NOW(), NOW(), 1),
(UUID(), 1500.00, 'Freelance payment', 'income', '2024-12-02 10:00:00', 'income', 'Bank', 'Wells Fargo', '0987654321', '0987654321', 'https://example.com/logo2.png', 'credit', NOW(), NOW(), 1),
(UUID(), 75.00, 'Monthly subscription', 'entertainment', '2024-12-03 18:45:00', 'expense', 'Credit Card', 'Amex', '987654321', '987654321', 'https://example.com/logo3.png', 'debit', NOW(), NOW(), 1),
(UUID(), 120.00, 'Dinner with friends', 'dining', '2024-12-04 20:15:00', 'expense', 'Bank', 'Bank of America', '456789123', '456789123', 'https://example.com/logo4.png', 'debit', NOW(), NOW(), 1),
(UUID(), 3000.00, 'Bonus from work', 'income', '2024-12-05 11:00:00', 'income', 'Bank', 'Chase Bank', '1234567890', '1234567890', 'https://example.com/logo1.png', 'credit', NOW(), NOW(), 1),
(UUID(), 450.00, 'Online shopping', 'shopping', '2024-12-06 15:00:00', 'expense', 'Bank', 'Wells Fargo', '0987654321', '0987654321', 'https://example.com/logo2.png', 'debit', NOW(), NOW(), 1),
(UUID(), 500.00, 'Stock dividend', 'investment', '2024-12-07 16:00:00', 'income', 'Investment', 'Robinhood', 'invest12345', 'invest12345', 'https://example.com/logo5.png', 'credit', NOW(), NOW(), 1),
(UUID(), 90.00, 'Gym membership', 'health', '2024-12-08 07:00:00', 'expense', 'Credit Card', 'Visa', '1122334455', '1122334455', 'https://example.com/logo6.png', 'debit', NOW(), NOW(), 1);


-- Generate 100 diverse transactions including Indian and international details.
INSERT INTO `transactions` (`id`, `amount`, `description`, `category`, `date`, `type`, `assetClass`, `assetName`, `accountNumber`, `cardNumber`, `logo`, `transactionType`, `createdAt`, `updatedAt`, `userId`) VALUES
-- Transactions for User 1 (International)
(UUID(), 200.00, 'Groceries shopping', 'shopping', '2024-12-01 14:30:00', 'expense', 'Bank', 'Chase Bank', '1234567890', '1234567890', 'https://example.com/logo1.png', 'debit', NOW(), NOW(), 1),
(UUID(), 1500.00, 'Freelance payment', 'income', '2024-12-02 10:00:00', 'income', 'Bank', 'Wells Fargo', '0987654321', '0987654321', 'https://example.com/logo2.png', 'credit', NOW(), NOW(), 1),
(UUID(), 75.00, 'Monthly subscription', 'entertainment', '2024-12-03 18:45:00', 'expense', 'Credit Card', 'Amex', '987654321', '987654321', 'https://example.com/logo3.png', 'debit', NOW(), NOW(), 1),
(UUID(), 120.00, 'Dinner with friends', 'dining', '2024-12-04 20:15:00', 'expense', 'Bank', 'Bank of America', '456789123', '456789123', 'https://example.com/logo4.png', 'debit', NOW(), NOW(), 1),
(UUID(), 3000.00, 'Bonus from work', 'income', '2024-12-05 11:00:00', 'income', 'Bank', 'Chase Bank', '1234567890', '1234567890', 'https://example.com/logo1.png', 'credit', NOW(), NOW(), 1),

-- Transactions for User 2 (Indian-specific)
(UUID(), 7500.00, 'Salary credit', 'income', '2022-01-01 09:00:00', 'income', 'Bank', 'HDFC Bank', '9876543210', '9876543210', 'https://example.com/logo_india1.png', 'credit', NOW(), NOW(), 1),
(UUID(), 1200.00, 'Electricity bill', 'utilities', '2022-01-15 11:30:00', 'expense', 'Bank', 'HDFC Bank', '9876543210', '9876543210', 'https://example.com/logo_india1.png', 'debit', NOW(), NOW(), 1),
(UUID(), 850.00, 'Dinner with family', 'dining', '2023-03-10 20:00:00', 'expense', 'Credit Card', 'SBI Card', '5556667778', '5556667778', 'https://example.com/logo_india2.png', 'debit', NOW(), NOW(), 1),
(UUID(), 15000.00, 'Freelance project', 'income', '2023-04-01 14:00:00', 'income', 'Bank', 'ICICI Bank', '3332221110', '3332221110', 'https://example.com/logo_india3.png', 'credit', NOW(), NOW(), 1),
(UUID(), 4000.00, 'Vacation expenses', 'travel', '2023-12-20 18:00:00', 'expense', 'Bank', 'ICICI Bank', '3332221110', '3332221110', 'https://example.com/logo_india3.png', 'debit', NOW(), NOW(), 1),

-- Additional transactions for User 1 & 2 (more data across years)
(UUID(), 1800.00, 'Fuel expenses', 'transport', '2021-11-15 07:00:00', 'expense', 'Bank', 'State Bank of India', '8887776665', '8887776665', 'https://example.com/logo_india5.png', 'debit', NOW(), NOW(), 1),
(UUID(), 9000.00, 'Consulting fee', 'income', '2021-10-05 10:30:00', 'income', 'Bank', 'State Bank of India', '8887776665', '8887776665', 'https://example.com/logo_india5.png', 'credit', NOW(), NOW(), 1),
(UUID(), 150.00, 'Coffee shop', 'dining', '2023-06-15 09:45:00', 'expense', 'Credit Card', 'Visa', '1122334455', '1122334455', 'https://example.com/logo6.png', 'debit', NOW(), NOW(), 1),
(UUID(), 300.00, 'Fitness equipment', 'health', '2023-07-01 14:20:00', 'expense', 'Bank', 'Wells Fargo', '0987654321', '0987654321', 'https://example.com/logo2.png', 'debit', NOW(), NOW(), 1),
(UUID(), 8000.00, 'Investment return', 'investment', '2022-03-10 10:15:00', 'income', 'Investment', 'Zerodha', 'invest12345', 'invest12345', 'https://example.com/logo7.png', 'credit', NOW(), NOW(), 1),

-- Repeat similar patterns to generate more transactions across various dates, users, and categories
(UUID(), 350.00, 'Gadgets purchase', 'shopping', '2022-05-22 16:30:00', 'expense', 'Credit Card', 'Amex', '234567890', '234567890', 'https://example.com/logo8.png', 'debit', NOW(), NOW(), 1),
(UUID(), 4500.00, 'Freelance payment', 'income', '2023-11-15 12:00:00', 'income', 'Bank', 'Axis Bank', '1231231234', '1231231234', 'https://example.com/logo_india4.png', 'credit', NOW(), NOW(), 1),
(UUID(), 250.00, 'Books purchase', 'education', '2021-08-30 14:00:00', 'expense', 'Bank', 'Chase Bank', '4567890123', '4567890123', 'https://example.com/logo9.png', 'debit', NOW(), NOW(), 1),
(UUID(), 1200.00, 'Medical checkup', 'health', '2024-09-10 10:45:00', 'expense', 'Bank', 'ICICI Bank', '3332221110', '3332221110', 'https://example.com/logo_india3.png', 'debit', NOW(), NOW(), 1);

