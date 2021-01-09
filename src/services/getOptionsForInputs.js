import { get } from './api'
export async function getAddresses() {
  const response = await get('addresses')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.street,
        value: r.id
      })
    )
    return data
  }
  return []
}
// export async function getApplications() {
//   const response = await get('applications')
//   if (response.length) {
//     const data = response.map(r =>
//       ({
//         label: r.name,
//         value: r.id
//       })
//     )
//
//     return data
//   }
//   return []
// }

export async function getApplicationStatuses() {
  const response = await get('application-status')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.application_status,
        value: r.id
      })
    )
    return data
  }
  return []
}

export async function getInstitutions() {
  const response = await get('institutions')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.institution,
        value: r.institution
      })
    )
    return data
  }
  return []
}

export async function getCoursesDB() {
  const response = await get('courses_db')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.course,
        value: r.course
      })
    )
    return data
  }
  return []
}

export async function getAreas() {
  const response = await get('areas')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.area,
        value: r.id
      })
    )
    return data
  }
  return []
}

export async function getCompanies() {
  const response = await get('companies')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.company,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getContractTypes() {
  const response = await get('contract-types')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.contract_type,
        value: r.id
      })
    )
    return data
  }
  return []
}

export async function getCourses() {
  const response = await get('courses')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.course,
        value: r.id
      })
    )
    return data
  }
  return []
}

export async function getDetachedPlans() {
  const response = await get('detached-plans')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.plan,
        value: r.id
      })
    )
    return data
  }
  return []
}

export async function getInterests() {
  const response = await get('interests')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.title,
        value: r.id
      })
    )
    return data
  }
  return []
}

export async function getLevels() {
  const response = await get('levels')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.level,
        value: r.id
      })
    )
    return data
  }
  return []
}

// export async function getMeetings() {
//   const response = await get('meetings')
//   if (response.length) {
//     const data = response.map(r =>
//       ({
//         label: r.name,
//         value: r.id
//       })
//     )
//
//     return data
//   }
//   return []
// }

export async function getPayments() {
  const response = await get('payments')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.payment,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getPermissions() {
  const response = await get('permissions')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.permission,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getPhones() {
  const response = await get('phones')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.phone,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getPlans() {
  const response = await get('plans')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.plan,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getPortfolios() {
  const response = await get('portfolio')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.portfolio,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getPosts() {
  const response = await get('posts')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.title,
        value: r.id
      })
    )
    return data
  }
  return []
}

export async function getPostCategories() {
  const response = await get('post-categories')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.post_category,
        value: r.id
      })
    )
    return data
  }
  return []
}

// export async function getPurchasedCandidates() {
//   const response = await get('purchased-candidates')
//   if (response.length) {
//     const data = response.map(r =>
//       ({
//         label: r.name,
//         value: r.id
//       })
//     )
//
//     return data
//   }
//   return []
// }

export async function getPurchasedRequests() {
  const response = await get('purchased-requests')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.title,
        value: r.id
      })
    )
    return data
  }
  return []
}

// export async function getRecomends() {
//   const response = await get('recomends')
//   if (response.length) {
//     const data = response.map(r =>
//       ({
//         label: r.name,
//         value: r.id
//       })
//     )
//
//     return data
//   }
//   return []
// }

export async function getRequestStatuses() {
  const response = await get('request-statuses')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.request_status,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getRoles() {
  const response = await get('roles-notadmin')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.role,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getSkills() {
  const response = await get('skills')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.title,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getStrongPoints() {
  const response = await get('strong-points')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.content,
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getUsers() {
  const response = await get('users-simple')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.name ?? 'USER',
        value: r.id
      })
    )
    return data
  }
  return []
}
export async function getVacancies() {
  const response = await get('vacancies')
  if (response.length) {
    const data = response.map(r =>
      ({
        label: r.description,
        value: r.id
      })
    )
    return data
  }
  return []
}
