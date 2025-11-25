import type { User } from '../types/user'

export const UserCard = ({ user }: { user: User }) => (
  <article className="user-card glass-card">
    <div className="profile-header">
      <div className="profile-avatar">{user.name.charAt(0)}</div>
      <div>
        <h2>{user.name}</h2>
        <p className="muted">ID: {user.id}</p>
      </div>
    </div>
    
    <dl className="profile-details">
      <div className="detail-section">
        <h3>Contact Information</h3>
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{user.phone}</dd>
        </div>
        {user.website ? (
          <div>
            <dt>Website</dt>
            <dd>
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </dd>
          </div>
        ) : null}
      </div>

      {user.address ? (
        <div className="detail-section">
          <h3>Address</h3>
          <div>
            <dt>Street</dt>
            <dd>{user.address.street}</dd>
          </div>
          <div>
            <dt>Suite</dt>
            <dd>{user.address.suite}</dd>
          </div>
          <div>
            <dt>City</dt>
            <dd>{user.address.city}</dd>
          </div>
        </div>
      ) : null}

      {user.company ? (
        <div className="detail-section">
          <h3>Company</h3>
          <div>
            <dt>Name</dt>
            <dd>{user.company.name}</dd>
          </div>
          {user.company.catchPhrase ? (
            <div>
              <dt>Catch Phrase</dt>
              <dd>{user.company.catchPhrase}</dd>
            </div>
          ) : null}
          {user.company.bs ? (
            <div>
              <dt>Business</dt>
              <dd>{user.company.bs}</dd>
            </div>
          ) : null}
        </div>
      ) : null}
    </dl>
  </article>
)
