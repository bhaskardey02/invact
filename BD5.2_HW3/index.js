let express = require('express');
let { company } = require('./models/company.model');
let { sequelize } = require('./lib/index');

let app = express();

let companiesData = [
  {
    id: 1,
    name: 'Tech Innovators',
    industry: 'Technology',
    foundedYear: 2010,
    headquarters: 'San Francisco',
    revenue: 75000000,
  },
  {
    id: 2,
    name: 'Green Earth',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Portland',
    revenue: 50000000,
  },
  {
    id: 3,
    name: 'Innovatech',
    industry: 'Technology',
    foundedYear: 2012,
    headquarters: 'Los Angeles',
    revenue: 65000000,
  },
  {
    id: 4,
    name: 'Solar Solutions',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Austin',
    revenue: 60000000,
  },
  {
    id: 5,
    name: 'HealthFirst',
    industry: 'Healthcare',
    foundedYear: 2008,
    headquarters: 'New York',
    revenue: 80000000,
  },
  {
    id: 6,
    name: 'EcoPower',
    industry: 'Renewable Energy',
    foundedYear: 2018,
    headquarters: 'Seattle',
    revenue: 55000000,
  },
  {
    id: 7,
    name: 'MediCare',
    industry: 'Healthcare',
    foundedYear: 2012,
    headquarters: 'Boston',
    revenue: 70000000,
  },
  {
    id: 8,
    name: 'NextGen Tech',
    industry: 'Technology',
    foundedYear: 2018,
    headquarters: 'Chicago',
    revenue: 72000000,
  },
  {
    id: 9,
    name: 'LifeWell',
    industry: 'Healthcare',
    foundedYear: 2010,
    headquarters: 'Houston',
    revenue: 75000000,
  },
  {
    id: 10,
    name: 'CleanTech',
    industry: 'Renewable Energy',
    foundedYear: 2008,
    headquarters: 'Denver',
    revenue: 62000000,
  },
];

//E0

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await company.bulkCreate(companiesData);

    res.status(200).json({ message: 'Database Seeding successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

//E1

async function fetchAllCompanies() {
  let companies = await company.findAll();
  return { companies };
}

app.get('/companies', async (req, res) => {
  try {
    let response = await fetchAllCompanies();

    if (response.companies.length === 0) {
      return res.status(404).json({ message: 'No companies found' });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E2

async function fetchCompaniesById(id) {
  let companyData = await company.findOne({ where: { id } });
  return { companyData };
}

app.get('/companies/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchCompaniesById(id);

    if (result.companyData === null) {
      return res.status(400).json({ error: 'data not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E3

async function fetchEmployeesByIndustry(industry) {
  let companyData = await company.findAll({ where: { industry } });
  return { companyData };
}

app.get('/companies/industry/:industry', async (req, res) => {
  try {
    let industry = req.params.industry;
    let result = await fetchEmployeesByIndustry(industry);
    if (result.companyData.length === 0) {
      return res.status(400).json({ error: 'data not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E4

async function sortCompaniesByRevenue(order) {
  let companyData = await company.findAll({ order: [['revenue', order]] });
  return { companyData };
}

app.get('/companies/revenue', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortCompaniesByRevenue(order);

    if (result.companyData.length === 0) {
      res.status(400).json({ message: 'No Data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
