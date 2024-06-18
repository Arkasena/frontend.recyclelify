import Auth from '../../../../utils/auth';
import { setLayoutDashboard } from '../../../templates/template-creator';

const partnerDashboardNotification = {
  async render() {
    return `
      <section class="flex pb-10 px-[32px] py-[25px] bg-gray-50 w-full">
        <div class="w-full bg-white rounded-2xl p-6" id="notification-container">
        </div>
      </section>
    `;
  },

  async afterRender() {
    Auth.isPartner();
    setLayoutDashboard(2);
    const notifications = [
      {
        seller_name: 'PT Asri Indah',
        date: '23 April 2024',
        status_message: 'offering',
      },
      {
        seller_name: 'PT Asri Indah',
        date: '24 April 2024',
        status_message: 'shipping_cost_rejection',
      },
      {
        seller_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'shipping_cost_approval',
      },
      {
        seller_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'reminder',
      },
      {
        seller_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'canceled-dropoff',
      },
      {
        seller_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'canceled-pickup',
      },
      {
        seller_name: 'PT Asri Indah',
        date: '25 April 2024',
        status_message: 'finished',
      },
    ];

    const notificationContainer = document.getElementById('notification-container');

    notifications.forEach((notificationData, index) => {
      const notificationElement = document.createElement('partner-notification-message');
      notificationElement.id = `notification${index + 1}`;
      notificationContainer.appendChild(notificationElement);
      notificationElement.NotificationData = notificationData;
    });
  },
};

export default partnerDashboardNotification;
