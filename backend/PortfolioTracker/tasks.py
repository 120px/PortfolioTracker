# myapp/tasks.py
from celery import shared_task
# from userinformation.models import PortfolioSnapshot
# from authentication.models import CustomUser

@shared_task
def snapshot_total_portfolio_value():
    print("creating")
    # users = CustomUser.objects.all()
    # for user in users:
    #     PortfolioSnapshot.objects.create(
    #         user=user,
    #         total_value=user.total_holdings  # Replace with the actual field name for total portfolio value
    #     )
