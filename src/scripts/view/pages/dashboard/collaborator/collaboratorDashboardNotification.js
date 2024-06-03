import { setLayoutDashboard } from '../../../templates/template-creator';

const collaboratorDashboardNotification = {
  async render() {
    return `
      <section class="flex pb-10 px-[32px] py-[25px] bg-gray-50 w-full">
        <div class="w-full bg-white rounded-2xl p-6" id="notification-container">
        </div>
      </section>
    `;
  },

  async afterRender() {
    setLayoutDashboard();
    const notifications = [
      {
        company_name: 'PT Asri Indah',
        date: '23 April 2024',
        status_message: 'approval',
        shipping_cost: '50000',
      },
      {
        company_name: 'PT Asri Indah',
        date: '24 April 2024',
        status_message: 'declination',
        shipping_cost: '50000',
      },
      {
        company_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'finished',
        shipping_cost: '50000',
      },
      {
        company_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'shipping_cost',
        shipping_cost: '60000',
      },
      {
        company_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'approval_dropoff',
        shipping_cost: '60000',
      },
      {
        company_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'reminder',
        shipping_cost: '60000',
      },
      {
        company_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'finished',
        shipping_cost: '60000',
      },
    ];

    const notificationContainer = document.getElementById('notification-container');

    notifications.forEach((notificationData, index) => {
      const notificationElement = document.createElement('collaborator-notification-message');
      notificationElement.id = `notification${index + 1}`;
      notificationContainer.appendChild(notificationElement);
      notificationElement.NotificationData = notificationData;
    });
  },
};

export default collaboratorDashboardNotification;
