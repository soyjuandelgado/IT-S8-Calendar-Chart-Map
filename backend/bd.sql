--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;

CREATE TABLE `meeting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `longitude` decimal(11, 8) NOT NULL,
  `latitude` decimal(10, 8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = latin1;

--
-- Dumping data for table `meeting`
--

LOCK TABLES `meeting` WRITE;

INSERT INTO `meeting`
VALUES (
    1,
    'Weekly ITA',
    '932917610',
    '2025-09-22',
    2.19453037,
    41.40249323
  ),
(
    2,
    'Kick Off 42',
    '654987321',
    '2025-09-22',
    2.16967573,
    41.43649161
  );

UNLOCK TABLES;