using Azure.Messaging.ServiceBus;
using System.Text.Json;

public class ServiceBusSender
{
    private readonly ServiceBusClient _client;
    private readonly Azure.Messaging.ServiceBus.ServiceBusSender _sender;

    public ServiceBusSender(IConfiguration config)
    {
        _client = new ServiceBusClient(config["AzureServiceBus:ConnectionString"]);
        _sender = _client.CreateSender(config["AzureServiceBus:QueueName"]);
    }

    public async Task SendStatusUpdateEvent(string trackingNumber, string newStatus)
    {
        var message = new ServiceBusMessage(
            JsonSerializer.Serialize(new {
                TrackingNumber = trackingNumber,
                NewStatus = newStatus,
                Timestamp = DateTime.UtcNow
            })
        );
        await _sender.SendMessageAsync(message);
    }

    public async ValueTask DisposeAsync() => await _client.DisposeAsync();
}