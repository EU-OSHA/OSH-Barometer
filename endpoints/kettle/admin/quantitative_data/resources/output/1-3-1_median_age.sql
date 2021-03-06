
SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="AT" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 43.4);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="BE" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 41.7);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="BG" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 44.5);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="CY" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 37.7);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="HR" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 44);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="CZ" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 42.6);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="DK" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 41.9);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="EE" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 42.1);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="FI" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 42.9);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="FR" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 41.8);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="DE" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 46);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="EL" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 44.9);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="HU" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 43);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="IE" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 37.7);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="IT" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 46.7);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="LV" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 43.5);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="LT" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 44.1);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="LU" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 39.5);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="MT" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 40);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="NL" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 42.7);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="PL" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 41);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="PT" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 45.2);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="RO" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 42.5);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="SK" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 40.6);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="SI" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 44);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="ES" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 44);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="SE" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 40.5);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="UK" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 40.2);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="EU28" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 43.3);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="IS" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 36.4);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="CH" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 42.5);

SET @profileID = (SELECT p.id FROM profile p INNER JOIN nuts n ON p.nuts_id=n.id WHERE n.country_code="NO" AND activity_sector_id IS NULL AND age_group_id IS NULL AND answer_id IS NULL AND company_size_id IS NULL AND currency_id IS NULL AND gender_id IS NULL AND illness_id IS NULL AND subindicator_id IS NULL AND year IS NULL);
SET @indicatorID = (SELECT id FROM indicator WHERE name="Median age of population");
SET @datasetID = (SELECT dataset_id FROM indicators_in_dataset iid INNER JOIN dataset d ON iid.dataset_id=d.id WHERE indicator_id=@indicatorID AND d.date_from="2019-01-01");
INSERT INTO value (dataset_id, indicator_id, profile_id, value)VALUES (@datasetID, @indicatorID, @profileID, 39.7);
