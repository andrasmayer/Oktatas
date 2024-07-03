-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Júl 03. 14:45
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `gyakorlat`
--

DELIMITER $$
--
-- Eljárások
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `showOrders` (IN `date` DATE)   BEGIN


SELECT 

orders.userId,
users.userName,
orders.productId,
products.prodName,
orders.quantity,
products.price,
products.price * orders.quantity as sum,
orders.orderDate,date


FROM `orders`

left join users on users.id = orders.userId
left join products on products.id = orders.productId



where orders.orderDate >= date;






END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `showOrdersByUsers` (IN `date` DATE)   BEGIN


SELECT 

orders.userId,
users.userName,




sum(products.price * orders.quantity) as sum



FROM `orders`

left join users on users.id = orders.userId
left join products on products.id = orders.productId

where orders.orderDate >= date

group by orders.userId;





END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `orderDate` datetime NOT NULL DEFAULT current_timestamp(),
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `productId`, `orderDate`, `quantity`) VALUES
(1, 1, 1, '2020-07-03 14:07:58', 4),
(2, 1, 3, '2020-07-03 14:07:58', 1),
(3, 2, 4, '2024-07-03 14:07:58', 5),
(4, 3, 1, '2024-07-03 14:07:58', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `prodName` varchar(100) NOT NULL,
  `cretaed` datetime NOT NULL DEFAULT current_timestamp(),
  `modDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `prodName`, `cretaed`, `modDate`, `price`) VALUES
(1, 'Hajkefe', '2024-07-03 14:03:16', '2020-07-03 12:03:51', 10),
(2, 'Gyertya', '2024-07-03 14:03:16', '2020-07-03 12:03:54', 32),
(3, 'Szappan', '2024-07-03 14:03:16', '2024-07-03 12:03:56', 33),
(4, 'Törölköző', '2024-07-03 14:03:16', '2020-07-03 12:03:59', 336),
(5, 'Biciglipumpa', '2024-07-03 14:03:16', '2024-07-03 12:04:02', 1022),
(6, 'Villanykörte', '2024-07-03 14:03:16', '2024-07-03 12:04:14', 222);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `regDate` datetime NOT NULL DEFAULT current_timestamp(),
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `userName`, `regDate`, `email`) VALUES
(1, 'Adél', '2024-07-03 13:57:30', 'adel@gmail.com'),
(2, 'Ede', '2024-07-03 13:57:30', 'ede@gmail.com'),
(3, 'Béla', '2024-07-03 13:57:30', 'bela@citromail.com'),
(4, 'Ferenc', '2024-07-03 13:57:30', 'ferenc@gmail.com');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
